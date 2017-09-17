import json
from random import shuffle

def gprint(x):
	for i,g in enumerate(x):
		print '{}. {}'.format(i+1, g['title'])

def compare(x,y):
	print 'Rank:'
	print '1. {}'.format(x['title'])
	print '2. {}'.format(y['title'])
	x = int(raw_input('Input:'))
	print ''
	if x == 2:
		return False
	else:
		return True
	
def merge(a,b):
	result = []
	m = 0
	n = 0
	while m < len(a) and n < len(b):
		output = compare(a[m], b[n])
		if output:
			result.append(a[m])
			m+=1
		else :
			result.append(b[n])
			n+=1
	result += a[m:]
	result += b[n:]
	return result

def msort(arr):
	result = []
	if len(arr) < 2:
		return arr		
	mid = int(len(arr)/2)
	a = msort(arr[:mid])
	b = msort(arr[mid:])
	return merge(a,b)
	
def load_games():
	f = open('game-timeline-data.js', 'r')
	c = f.read()
	f.close()
	c=c.replace('var games = ','').replace(';','')
	data=json.loads(c)
	return data

data=load_games()
shuffle(data)
subset= data[0:5]
gprint(subset)
result = msort(subset)
print 'Unsorted:'
gprint(subset)
print 'Sorted:'
gprint(result)