build: clean node_modules
	node node_modules/webpack/bin/webpack.js

node_modules:
	npm install

.PHONY: generate
generate:
	python3 generate.py

.PHONY: clean
clean:
	rm -f *.data.pickle
