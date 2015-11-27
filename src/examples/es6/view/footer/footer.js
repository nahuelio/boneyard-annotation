/**
*	Es6 Examples - Footer
*	@module examples.es6.view.footer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
import Container from 'ui/container';

/**
*	Class Footer
*	@namespace examples.es6.view.footer
*	@class examples.es6.view.footer.Footer
*	@extends ui.Container
*
*	@requires ui.Container
*
*	@spec({ id: "specs/common/footer" })
*	@bone({ id: "footer", spec: "specs/common/footer" })
*/
class Footer extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return examples.es6.view.footer.Footer
	*/
	initialize(...args) {
		return super.initialize(...args);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Footer';
	}

}

export default Boneyard.namespace('examples.es6.view.footer.Footer', Header);
