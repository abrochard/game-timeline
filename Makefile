generate: generate.py
	python generate.py

commit: game-timeline-data.js
	git add covers/* game-timeline-data.js
	git commit -m 'updating'

.PHONY: clean
clean:
	rm -f *.data.pickle

.PHONY: all
all: clean generate commit
