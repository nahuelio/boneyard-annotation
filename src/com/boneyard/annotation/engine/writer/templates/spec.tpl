/**
*	Spec <%= id %><%= (obj.author) ? "\n*\t@author " + obj.author : "" %>
**/
define([<%= paths %>], function(<%= dependencies %>) {
	$id: '<%= id %>',
	$specs: [<%= specs %>]
	<%= (obj.bones) ? "," + obj.bones : "" %>
	<%= (obj.actions) ? ",$actions: [ " + obj.actions + " ]" : "" %>
	<%= (obj.plugins) ? ",$plugins: { " + obj.plugins + " }" : "" %>
});
