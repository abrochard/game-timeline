build: node_modules
	npm run build

node_modules:
	npm install

.PHONY: generate
generate: clean
	python3 generate.py

.PHONY: clean
clean:
	rm -f *.data.pickle

.PHONY: commit
commit:
	git add src/lib/games.json build/*
	git status
	git commit -m 'updating'


.PHONY: push
push:
	git push

.PHONY: pull
pull:
	git pull

.PHONY: up
up: pull generate build commit push
