define([
	'underscore',
	'enquire',
	'backbone',
	'backbone.marionette',
	'communicator',
	'config',
	'controllers/analytics',
	'controllers/share',
],
function( _,
	Enquire,
	Backbone,
	Marionette,
	Communicator,
	Config,
	AnalyticsController,
	ShareController) {
	'use strict';

	var App = new Backbone.Marionette.Application();
	var regions = new Marionette.RegionManager();

	/* Add application regions here */
	regions.addRegions({
		nav: '#l-nav'
	});

	App.addInitializer(function(){
		Enquire.register('screen and (max-width: 764px) and (min-width: 0)', {
			match: function() {
				Communicator.mediator.trigger('resolution', 'mobile');
			}
		});

		Enquire.register('screen and (max-width: 1039px) and (min-width: 765px)', {
			match: function() {
				Communicator.mediator.trigger('resolution', 'tablet');
			}
		});

		Enquire.register('screen and (min-width: 1040px)', {
			match: function() {
				Communicator.mediator.trigger('resolution', 'desktop');
			}
		});
	});

	new AnalyticsController({
		regions: regions
	});

	new ShareController();

	return App;
});
