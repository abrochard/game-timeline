build: node_modules
	node node_modules/webpack/bin/webpack.js --config prod.config.js

node_modules:
	npm install

.PHONY: generate
generate: clean
	python2 generate.py

.PHONY: clean
clean:
	rm -f *.data.pickle
