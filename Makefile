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


.PHONY: up
up: generate build commit
