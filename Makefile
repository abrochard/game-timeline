generate: generate.py
	python generate.py

.PHONY: clean
clean:
	rm -f *.data.pickle

.PHONY: all
all: clean generate
