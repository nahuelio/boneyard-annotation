###
#	Make Targets Spinal IoC Annotation based Module
###

clean:
	@echo "\033[1;36mClean Phase...\033[0m"
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
	@echo "\033[1;36m[Test Phase]\033[0m"
	@make clean-test
	@./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover \
		./node_modules/.bin/_mocha -- --opts mocha.opts

test-examples:
	@echo "\033[1;36m[Example Tests Phase]\033[0m"
	@make clean-examples-test
	@karma start karma.config.js --no-auto-watch --single-run

coverage:
	@echo "\033[1;36m[Coverage Results]\033[0m"
	@./bin/sioc coverage

docs:
	@echo "\033[1;36m[Documentation Phase]\033[0m"
	@make clean-docs
	@node ./node_modules/yuidocjs/lib/cli -q -c ./yuidoc.json ./src

build:
	@echo "\033[1;36m[Build Phase]\033[0m"
	@make clean-build && mkdir bin
	@cp ./index.js bin/sioc

release:
	@echo "\033[1;36m[Releasing Spinal IoC Annotation Tool]\n\033[0m"
	@make test && make docs && make build
	@echo "\033[1;33mNPM Linking...\033[0m"
	@npm link

.PHONY: clean clean-test clean-examples-test clean-docs clean-build test test-examples coverage docs build release
