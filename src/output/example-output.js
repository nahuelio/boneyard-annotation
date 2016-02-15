// > Spec Header
{
	$id: 'header',
	$specs: [],

	[uuid-header]: {
		$module: 'ui/basic/header',
		$params: { heading: '2' }
	},

	header: {
		$module: 'view/header',
		$params: [{
			views: ['$bone![uuid-header]']
		}]
	}
}

// > Spec Footer
{
	$id: 'footer',
	$specs: [],

	[uuid-paragraph]: {
		$module: 'ui/basic/paragraph',
		$params: { content: 'Copyright' }
	},

	footer: {
		$module: 'view/footer',
		$params: [{
			views: ['$bone![uuid-paragraph]']
		}]
	}
}

// > Spec Main
requires views.pages.breadcrumb.BreadCrumbItem
{
	$id: 'main',
	$specs: ['header', 'footer'],

	[uuid-container]: {
		$module: 'ui/container',
		$params: { cls: 'content' }
	},

	breadcrumbs: {
		$module: 'view/common/breadcrumbs',
		$params: { type: BreadCrumbItem }
	},

	$actions: [
		{ '$bone!application.render': [] }
	]
}

// > Spec Home
{
	$id: 'home',
	$specs: ['main'],

	[uuid-header]: {
		$module: 'ui/basic/header',
		$params: {
			heading: 5,
			title: 'Home'
		}
	},

	home: {
		$module: 'view/pages/home',
		$params: {
			views: ['$bone!header', '$bone!footer', '$bone![uuid-header]']
		}
	},

	$actions: [
		{ '$bone!home.add': [] }
	]
}
