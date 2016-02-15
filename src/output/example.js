/**
*	@spec({ id: 'header', path: 'specs/header/header' })
*	@bone({ id: 'header', spec: 'header' })
**/
class Header extends Container {

	/**
	*	@header({ on: 'attrs.views', heading: '2' })
	**/
	constructor(attrs = {}) {
		super(attrs);
	}

}

/**
*	@spec({ id: 'footer', path: 'specs/footer/footer' })
*	@bone({ id: 'footer', spec: 'footer' })
**/
class Footer extends Container {

	/**
	*	@paragraph({ on: 'attrs.views', content: 'Copyright' })
	**/
	constructor(attrs = {}) {
		super(attrs);
	}

}

/**
*	@bone({ id: 'breadcrumbs',
*		spec: 'main',
*		params: [{ type: '$requires!views.pages.breadcrumb.BreadCrumbItem' }]
*	})
**/
class BreadCrumbs extends List {

	constructor(attrs = {}) {
		super(attrs);
	}

}

/**
*	@spec({ id: 'main', path: 'specs/master/main', include: ['header', 'footer'] })
*	@bone({ id: 'application', spec: 'main', singleton: true })
**/
class Application extends Container {

	/**
	*	@wire({ id: 'header', on: 'attrs.views' })
	*	@wire({ id: 'breadcrumbs', on: 'attrs.views' })
	*	@wire({ id: 'footer', on: 'attrs.views' })
	**/
	constructor(attrs = {}) {
		super(attrs);
	}

}

/**
*	@spec({ id: 'home', path: 'specs/pages/home', include: ['main'] })
*	@bone({ id: 'home', spec: 'home', inherits: 'application' })
*	@action({ method: 'render' })
**/
class Home extends Application {

	className: 'cols-xs-12 home',

	/**
	*	@header({ heading: '5', title: 'Home', on: 'attrs.views' })
	**/
	constructor(attrs = {}) {
		super(attrs);
	}

}

/** HTML Output **/
<head>
	<title>${page} | MyCompany</title>
	<!--- More Stuff... --->
	<script type='text/javascript' src='path/to/boneyard-core.js' data-spec='specs/pages/${page}'></script>
</head>

<body>
	<!--- More Stuff... --->
	<script type='text/javascript'>require(['config'], function() { require(['ioc/context']); });</script>
</body>
