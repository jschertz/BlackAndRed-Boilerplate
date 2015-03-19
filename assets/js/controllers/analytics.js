define([
	'jquery',
	'backbone',
	'config',
	'communicator',
	'backbone.marionette'
],
function( $, Backbone, Config, Communicator, Marionette) {
	'use strict';

	return Marionette.Controller.extend({

		initialize: function( options ) {
			this.options = options;

			// override navigate to log route changes
			var baseHistoryNavigate = Backbone.history.navigate;
			Backbone.history.navigate = function(fragment, options) {
				Communicator.mediator.trigger('Route:change:' + fragment.replace(/#/, ''));
				baseHistoryNavigate.apply(Backbone.history, [fragment, options]);
			};

			this.start();
		},

		trackClickEvent: function(el){
			var category = $(el).data('c');
			// don't send default tracking for all links, only
			// the links requested to be tracked
			if (!category) return;
			var action = $(el).data('a') || 'Click';

			// all should have a label, even if it's a blank one
			var label = $(el).data('l') || '';// || $(el).attr('href') || $(el).attr('class') || '';
			ga('send', 'event', category, action, label);
		},

		setRegionClickHandlers: function(regions) {
			var trackClick = _.bind(this.trackClickEvent, this);
			var setRegions = function(regions){
				regions.each(function(region) {
					region.on('show', function (view) {
						// the special multiview region has an array, but the
						// views in the array already get processed
						if (_.isArray(view)) {
							return;
						} else if(view.regions){
							// if a view has regions, it can also still have 
							// some view elements in it, e.g., LayoutView
							setRegions(view.regionManager);
						} 
						if (view.$el) {
							var $target = view.tagName === 'a' ? view.$el : view.$el.find('a');
							$target.on('click', function() {
								trackClick(this);
							});
						}
					});
				});
			};
			setRegions(regions);
		},

		onTweetPosted: function(type) {
			ga('send', 'event', 'Post Tweet ' + type, 'Complete', type);
		},

		start: function(){
			var trackClick = _.bind(this.trackClickEvent, this);
			// Track all clicks within Nav
			$('.social-bar a, .header-content .ribbon').on('click', function(){
				trackClick(this);
			});

			Communicator.mediator.on('tweet:posted', this.onTweetPosted, this);

			// Track all clicks within App
			this.setRegionClickHandlers(this.options.regions);
		}

	});

});
