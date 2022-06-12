build: node_modules
	node node_modules/webpack/bin/webpack.js --config prod.config.js

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
	git add games.json public/*
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
