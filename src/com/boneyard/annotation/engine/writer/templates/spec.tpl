/**
*	<%= project %> - Spec <%= name %>
**/
define([<%= dependencies %>], function(<%= dependencyNames %>) {
	$id: '<%= id %>',
	$specs: [<%= parent %>],
	<%= bones %>,
	$actions: [<%= actions %>],
	<%= plugins %>
});
