/**
*	Spec <%= id %><%= (obj.author) ? "\n*\t@author " + obj.author : "" %>
**/
define(<%= (obj.paths) ? "[" + obj.paths + "]" : "[]" %>, function(<%= dependencies %>) {
	return {
		$id: '<%= id %>'
		,$specs: [<%= specs %>]
		<%= (obj.bones) ? "," + obj.bones : "" %>
		<%= (obj.actions) ? ",$actions: [" + obj.actions + "]" : "" %>
		<%= (obj.plugins) ? ",$plugins: { " + obj.plugins + " }" : "" %>
	};
});
