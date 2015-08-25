###
#	Make Targets Spinal IoC Annotation based Module
###

clean:
	@echo "Clean Phase..."
	@make clean-test && make clean-examples-test && make clean-docs && make clean-build

clean-test:
	@rm -fr coverage
	@rm -f coverage.html

clean-examples-test:
	@rm -fr examples-coverage

clean-docs:
	@rm -fr apidocs

clean-build:
	@rm -fr bin

test:
	@echo "Test Phase..."
	@make clean-test
	@./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- --opts mocha.opts

test-examples:
	@echo "Example Tests Phase..."
	@make clean-examples-test
	@karma start karma.config.js --no-auto-watch --single-run

docs:
	@echo "Documentation Phase..."
	@make clean-docs
	@node ./node_modules/yuidocjs/lib/cli -q -c ./yuidoc.json ./src

build:
	@echo "Build Phase..."
	@make clean-build && mkdir bin
	@cp ./index.js bin/sioc

release:
	@echo "\nCreate Release..."
	@make test && make docs && make build
	@echo "NPM Linking..."
	@npm link

.PHONY: clean clean-test clean-examples-test clean-docs clean-build test test-examples docs build release
