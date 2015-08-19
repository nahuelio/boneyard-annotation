###
#	Make Targets Spinal IoC Annotation based Module
###

clean:
	@echo "Clean Phase..."
	@make clean-test && make clean-docs && make clean-build

clean-test:
	@rm -fr coverage

clean-docs:
	@rm -fr apidocs

clean-build:
	@rm -fr bin

test:
	@echo "Test Phase..."
	@make clean-test
	@karma start karma.config.js --no-auto-watch --single-run

docs:
	@echo "Documentation Phase..."
	@make clean-docs
	@node ./node_modules/yuidocjs/lib/cli -q -c ./yuidoc.json ./src

build:
	@echo "Build Phase..."
	@make clean-build && mkdir bin
	@cp src/com/spinal/annotation/cli/sioc.js bin/sioc

release:
	@echo "\nCreate Release..."
	@make test && make docs && make build
	@echo "NPM Linking..."
	@npm link

.PHONY:
	clean clean-test clean-docs clean-build test docs build release
