define([
	'backbone',
	'backbone.marionette',
],
function( Backbone, Marionette ) {
	'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		
		tagName: 'section',

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		initialize: function() {

		},

		/* on render callback */
		onRender: function() {}
	});

});
