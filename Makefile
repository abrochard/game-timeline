build: clean node_modules
	python generate.py && node node_modules/webpack/bin/webpack.js

node_modules:
	npm install

.PHONY: clean
clean:
	rm -f *.data.pickle
