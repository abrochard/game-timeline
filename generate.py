import requests
import pickle
import os.path
import urllib
import json
from subprocess import call
# from PIL import Image

# IGBD[CLIENTID,SECRET,HOST]
# AIRTABLE[KEY,HOST,HOST2]

class Config():
        def __init__(self):
                self.secret_file = {}
                if os.path.exists('.env'):
                        with open('.env', 'r') as f:
                                self.secret_file = json.load(f)
                self.IGDB = {
                        'CLIENTID': self._read_value('IGDB_CLIENTID', self.secret_file, None),
                        'SECRET': self._read_value('IGDB_SECRET', self.secret_file, None),
                        'HOST': self._read_value('IGDB_HOST', self.secret_file, 'https://api.igdb.com/v4'), # TODO
                }
                self.AIRTABLE = {
                        'HOST': self._read_value('AIRTABLE_HOST', self.secret_file, None),
                        'KEY': self._read_value('AIRTABLE_KEY', self.secret_file, None)
                }

        def _read_value(self, key, secrets, default):
                # check env var first
            v = os.getenv(key)
            if v is not None:
                return v

            # check secrets file next
            if key in secrets:
                return secrets[key]

            # if all failed
            if default is None:
                raise Exception(f'Missing required value {key}')
            return default

private = Config()


IGDB_FIELDS = {'igdbId'     :['id'],
               'slug'       :['slug'],
               'igdbName'   :['name'],
               'cover'      :['cover'],
               'url'        :['url'],
               'rating'     :['aggregated_rating']}

AIRTABLE_FIELDS = {'airtableId' :['id'],
                   'title'      :['fields', 'Title'],
                   'support'    :['fields', 'Support'],
                   'genre'      :['fields', 'Genre'],
                   'date'       :['fields', 'Finished Playing On'],
                   'completed'  :['fields', 'Completed'],
                   'igdbId'     :['fields', 'IGDB ID']}

IGDB_COVERS_BASE = 'https://images.igdb.com/igdb/image/upload/'
IGDB_COVERS_SIZES = ['cover_big']

MAX_CHUNKS = 10
FORCE_COVER_DOWNLOAD = False

igdb_auth = None

def igdb_login():
	global igdb_auth
	r = requests.post('https://id.twitch.tv/oauth2/token?client_id={}&client_secret={}&grant_type=client_credentials'.format(private.IGDB['CLIENTID'], private.IGDB['SECRET']))
	igdb_auth = r.json()['access_token']

def igdb_headers():
	global igdb_auth
	if not igdb_auth:
		igdb_login()
	return {'Client-ID': private.IGDB['CLIENTID'], 'Authorization': 'Bearer {}'.format(igdb_auth)}

def igdb_get_games(ids):
	url= private.IGDB['HOST'] + '/games'
	query = 'fields id,slug,name,cover,url,aggregated_rating; where id=({});'.format(','.join(ids))
	headers = igdb_headers()
	r = requests.post(url, headers=headers, data=query)
	return r.json()

def igdb_get_covers_url(ids):
	url=private.IGDB['HOST'] + '/covers'
	query = 'fields id,game,url; where id=({});'.format(','.join(ids))
	headers = igdb_headers()
	r = requests.post(url, headers=headers, data=query)
	return r.json()

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

def airtable_get_all_records(records=[], offset=''):
    url=private.AIRTABLE['HOST']
    if offset != '':
        url += '?offset='+offset
    headers={"Authorization": "Bearer "+private.AIRTABLE['KEY']}
    r=requests.get(url, headers=headers)
    response=r.json()
    if 'records' not in response:
            print(response)
    records+=response['records']
    if 'offset' in response:
        return airtable_get_all_records(records, response['offset'])
    else:
        return records

def download_cover(game, dest, size):
    data = igdb_get_covers_url([str(game['cover'])])
    url = 'https:' + data[0]['url'].replace('t_thumb', 't_'+size)
    call(["wget", url, "-O", dest])

def small_cover(dest):
    return False
    # img = Image.open(dest)
    # return img.height <= img.width

def check_cover(game):
    for size in IGDB_COVERS_SIZES:
        if 'slug' not in game:
            print('Game {} has no slug? Skipping'.format(game['title']))
            continue
        dest='public/covers/'+size+'/'+game['slug']+'.jpg'
        if os.path.isfile(dest) == False or small_cover(dest) or FORCE_COVER_DOWNLOAD:
            download_cover(game, dest, size)
    return True

def get_covers(games):
    for g in games:
        check_cover(g)
    return games

def parse_records(records):
    games = []
    for r in records:
        game = parseFields({}, r, AIRTABLE_FIELDS)
        games.append(game)
    return games


def split_chunks(l, n):
    chunks = []
    for i in range(0, len(l), n):
        chunks.append(l[i:i+n])
    return chunks

def load_from_igdb(games):
    chunks = split_chunks(games, MAX_CHUNKS)
    data = []
    for chunk in chunks:
        data = data + igdb_get_games(map(lambda g: str(g['igdbId']), chunk))

    dict = {d['id']:d for d in data}

    for i,g in enumerate(games):
        id = g['igdbId']
        if id not in dict:
            print('Error: unmatched game')
        else:
            games[i] = parseFields(g, dict[id], IGDB_FIELDS)

    return games

def load_from_airtable():
    print('Loading records')
    if os.path.isfile('airtable.data.pickle'):
        with open('airtable.data.pickle', 'rb') as f:
            records = pickle.load(f)
    else:
        records=parse_records(airtable_get_all_records())
        with open('airtable.data.pickle', 'wb') as f:
            pickle.dump(records, f, pickle.HIGHEST_PROTOCOL)
    print('Records loaded')
    return records

def load_games():
    print('Loading games')
    if os.path.isfile('games.data.pickle'):
        with open('games.data.pickle', 'rb') as f:
            games = pickle.load(f)
        print('Games loaded from disk')
        return games

    games = get_covers(load_from_igdb(load_from_airtable()))

    with open('games.data.pickle', 'wb') as f:
        pickle.dump(games, f, pickle.HIGHEST_PROTOCOL)

    print('Games loaded')
    return games

def setup_folders():
    if not os.path.exists('static/covers/'):
        os.makedirs('static/covers/')
    for size in IGDB_COVERS_SIZES:
        if not os.path.exists('static/covers/'+size):
            os.makedirs('static/covers/'+size)


def main():
    setup_folders()
    with open('src/lib/games.json', 'w') as f:
        f.write(json.dumps(load_games(), indent=2))

main()
