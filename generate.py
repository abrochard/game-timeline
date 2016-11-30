import requests
import pickle
import os.path
import hashlib
import urllib
import json

import private
# IGDB = {'KEY': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
#         'HOST': 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/'}

# AIRTABLE = {'KEY': 'XXXXXXXXXXXXXXXXXXXXXXXXX',
#             'HOST': 'https://api.airtable.com/v0/XXXXXXXXXXXXXXXXXXXXX'}

IGDB_FIELDS = {'igdbId'     :['id'],
               'slug'       :['slug'],
               'igdbName'   :['name'],
               'summary'    :['summary'],
               'url'        :['url'],
               'rating'     :['aggregated_rating'],
               'developers' :['developers']}

AIRTABLE_FIELDS = {'airtableId' :['id'],
                   'title'      :['fields', 'Title'],
                   'support'    :['fields', 'Support'],
                   'genre'      :['fields', 'Genre'],
                   'date'       :['fields', 'Finished Playing On'],
                   'completed'  :['fields', 'Completed'],
                   'igdbId'     :['fields', 'IGDB ID']}

def parseFields(game, data, fields):
    for key in fields:
        path=fields[key]
        x = data
        found = True
        for n in path:
            if n in x:
                x = x[n]
            else:
                game[key]=''
                found = False
                break
        if found:
            game[key] = x
    return game

def setCover(game, data):
    if 'cover' in data:
        game['cloudHash']=data['cover']['cloudinary_id']
        game['coverURL']='https://images.igdb.com/igdb/image/upload/t_cover_big/' + game['cloudHash'] + '.jpg'
    else:
        game['cloudHash']=''
        game['coverURL']='#'
    return game

def igdbSearch(title):
    title = title.replace(' ', '+')
    url = private.IGDB['HOST'] + '?fields=*&limit=1&search=' + title
    headers = {'X-Mashape-Key': private.IGDB['KEY'],
               'Accept': 'application/json'}
    r = requests.get(url, headers=headers)
    return r.json()

def getAllRecords(records=[], offset=''):
    url=private.AIRTABLE['HOST']
    if offset != '':
        url += '&offset='+offset
    headers={"Authorization": "Bearer "+private.AIRTABLE['KEY']}
    r=requests.get(url, headers=headers)
    response=r.json()
    records+=response['records']
    if 'offset' in response:
        return getAllRecords(records, response['offset'])
    else:
        return records

def getGameCover(game):
    dest='covers/'+game['slug']+'.jpg'
    if os.path.isfile(dest) or ('coverURL' not in game) or game['coverURL']=='#' or game['coverURL']=='':
        return False
    url=game['coverURL']
    f=open(dest, 'wb')
    f.write(urllib.request.urlopen(url).read())
    f.close()
    return True

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def parseRecords(records):
    games = []
    for r in records:
        game = parseFields({}, r, AIRTABLE_FIELDS)
        games.append(game)
    return games

def titleDiff(title, slug):
    lt = len(title.split(' '))
    ls = len(slug.split('-'))
    return ls - lt

def matchIGDB(game):
    if game['igdbId'] != '':
        r = getGameData([game])
    else:
        r=igdbSearch(game['title'])
    if len(r)==0:
        return game
    else:
        game = parseFields(game, r[0], IGDB_FIELDS)
        game = setCover(game, r[0])
        return game

def getGameData(games):
    url= private.IGDB['HOST']
    for g in games:
        url += str(g['igdbId']) + ','
        url = url[:-1] # remove final char
        url += '?fields=*'
        headers = {'X-Mashape-Key': private.IGDB['KEY'],
                   'Accept': 'application/json'}
        r = requests.get(url, headers=headers)
    return r.json()

def loadRecords():
    print('Loading records')
    if os.path.isfile('airtable.data.pickle'):
        with open('airtable.data.pickle', 'rb') as f:
            records = pickle.load(f)
    else:
        records=getAllRecords()
        with open('airtable.data.pickle', 'wb') as f:
            pickle.dump(records, f, pickle.HIGHEST_PROTOCOL)
    print('Records loaded')
    return records

def loadGames():
    print('Loading games')
    if os.path.isfile('games.data.pickle'):
        with open('games.data.pickle', 'rb') as f:
            games = pickle.load(f)
        print('Games loaded')
        return games

    records=loadRecords()
    games=parseRecords(records)

    for i in range(len(games)):
        games[i]=matchIGDB(games[i])
        getGameCover(games[i])
        g = games[i]
        if titleDiff(g['title'], g['slug']) > 0:
            print(g['title'], g['slug'])

    with open('games.data.pickle', 'wb') as f:
        pickle.dump(games, f, pickle.HIGHEST_PROTOCOL)

    print('Games loaded')
    return games


def main():
    games = loadGames()
    with open('game-timeline-data.js', 'w') as f:
        f.write('var games = ')
        f.write(json.dumps(games))
        f.write(';')

main()
