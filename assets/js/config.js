define([],
function() {
	'use strict';
	return {
		facebook: {
			appId: Environment.facebook.appId,
			shareTitle: '',
			shareUrl: (window.location != window.parent.location) ? document.referrer: document.location.href,
			shareCopy: {}
		},
		twitter: {
			shareUrl: (window.location != window.parent.location) ? document.referrer: document.location.href,
			shareCopy: {},
		},
		pinterest: {
			shareTitle: '',
			shareUrl: (window.location != window.parent.location) ? document.referrer: document.location.href
		},
	};
});
