define('main', [
	'backbone',
	'backbone.marionette',
	'application',
	'regionManager'
],
function ( Backbone, Marionette, App ) {
    'use strict';

	App.start();
	Backbone.history.start();
});
