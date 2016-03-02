##
#	Makefile for Boneyard Annotation
##

clean:
	@echo "\033[1;36mClean Phase...\033[0m"
	@make clean-test && make clean-examples-test && make clean-docs && make clean-build

clean-test:
	@rm -fr coverage

clean-examples-test:
	@rm -fr examples-coverage

clean-docs:
	@rm -fr apidocs

clean-build:
	@rm -fr bin

test:
	@echo "\033[1;36m[Test Phase]\033[0m"
	@LIB_PATH=$(shell pwd)/src/ ./node_modules/.bin/_mocha --opts mocha.opts --watch

test-examples:
	@echo "\033[1;36m[Example Tests Phase]\033[0m"
	@make clean-examples-test
	@karma start karma.config.js --no-auto-watch --single-run

coverage:
	@echo "\033[1;36m[Test/Coverage Phase]\033[0m"
	@make clean-test
	@LIB_PATH=$(shell pwd)/src/ ./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover \
		./node_modules/.bin/_mocha -- --opts mocha.opts

docs:
	@echo "\033[1;36m[Documentation Phase]\033[0m"
	@make clean-docs
	@node ./node_modules/yuidocjs/lib/cli -q -c ./yuidoc.json ./src

build:
	@echo "\033[1;36m[Build Phase]\033[0m"
	@make clean-build && mkdir bin
	@cp -p ./index.js bin/yard

release:
	@echo "\033[1;36m[Releasing Boneyard Annotation Tool]\n\033[0m"
	@make coverage && make docs && make build
	@echo "\n\033[1;36mRelease Completed.\033[0m"

start:
	@supervisor -w ./src -n exit -- ./bin/yard -c ./src/examples/config-sample.json

.PHONY:
	clean clean-test clean-examples-test clean-docs clean-build test test-examples coverage docs build release start
