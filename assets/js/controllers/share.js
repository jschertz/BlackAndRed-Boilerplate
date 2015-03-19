define([
	'underscore',
	'jquery',
	'backbone',
	'config',
	'communicator',
	'facebook',
	'backbone.marionette'
],
function( _, $, Backbone, Config, Communicator, FB, Marionette) {
	'use strict';

	return Marionette.Controller.extend({
		// store the last type of the tweet, because we won't
		// know where they came from when handling the 
		// twitter message
		_lastType: null,

		initialize: function( options ) {
			this.options = options;
			FB.init({
				appId: Config.facebook.appId
			});

			Communicator.command.setHandler('share:twitter', this.shareHeroTwitter, this);
			Communicator.command.setHandler('share:carousel', this.shareCarousel, this);
			Communicator.command.setHandler('share:link', this.shareLink, this);
			this.handleTwitterMessage = _.bind(this._handleTwitterMessage, this);
		},

		shareLink: function(name, network, link) {
			var copy = Config[network.toLowerCase()].shareCopy[name],
				shareMethod = _.bind(this['shareLink' + network], this);

			shareMethod(copy, link);
		},

		shareLinkTwitter: function(copy, link) {
			this.shareTwitter({
				copy: {
					twitter: copy
				},
				shareUrl: {
					twitter: ''
				}
			});
		},

		shareLinkFacebook: function(copy, link) {
			FB.ui({
				method: 'feed',
				name: Config.facebook.shareTitle,
				link: 'justgotjingled.com',
				description: copy,
				picture: 'http://d1alh5b8ifq1lv.cloudfront.net/ogimage.png'
			});
		},

		shareCarousel: function(name, network, carouselType) {
			var carousel = Config.carousel[name],
				shareMethod = _.bind(this['share' + network], this);

			shareMethod(carousel);
		},

		shareTwitter: function(carousel) {
			var url = this.buildTwitterUrl(carousel.copy.twitter + carousel.shareUrl.twitter);
			window.open(url, '_blank', 'width=450,height=450');
		},

		shareFacebook: function(carousel) {
			FB.ui({
				method: 'feed',
				name: Config.facebook.shareTitle,
				link: Config.facebook.shareUrl,
				description: carousel.copy.facebook + carousel.shareUrl.facebook,
				picture: carousel.imageUrl
			});
		},

		sharePinterest: function(carousel) {
			var url = this.buildPinterestUrl(carousel.copy.pinterest + carousel.shareUrl.pinterest, carousel.imageUrl);
			window.open(url, '_blank', 'width=765,height=320');
		},

		buildPinterestUrl: function(text, pictureUrl) {
			return [
				'//pinterest.com/pin/create/button/',
				'?url=', encodeURIComponent(Config.pinterest.shareUrl),
				'&media=', encodeURIComponent(pictureUrl),
				'&description=', encodeURIComponent(text)
			].join('');
		},

		shareHeroTwitter: function(type) {
			var copy = Config.twitter.shareCopy.hero[type],
				url = this.buildTwitterUrl(copy);

			window.open(url, 'Tweet', 'width=450,height=450');
			this._lastType = type;
			this.addEventListener('message', this.handleTwitterMessage);
		},

		_handleTwitterMessage: function(event) {
			var data;
			try {
				data = JSON.parse(event.data);
			} catch (e) {
				// don't care!
				return;
			}

			// twitter messages will have a 'tweet' param 
			// that is null after posting the tweet
			if (data.params && data.params.indexOf('tweet') > -1) {
				Communicator.mediator.trigger('tweet:posted', this._lastType);
				// remove the callback to prevent double handling
				this.removeEventListener('message', this.handleTwitterMessage);
			}
		},

		buildTwitterUrl: function(text) {
			return [
				'//twitter.com/intent/tweet?tw_p=tweetbutton',
				'&text=', encodeURIComponent(text)
			].join('');
		},

		addEventListener: function(event, callback) {
			window.addEventListener ?
				window.addEventListener(event, callback, !1) :
				window.attachEvent('on'+event, callback);
		},

		removeEventListener: function(event, callback) {
			window.removeEventListener ?
				window.removeEventListener(event, callback, !1) :
				window.detachEvent('on'+event, callback);
		}
	});

});
