require.config({

    baseUrl: '/js',

    /* disable so IE9 doesn't sometimes timeout */
    waitSeconds: 0,

    /* starting point for application */
    deps: ['backbone.marionette', 'main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        facebook: {
            exports: 'FB'
        }
    },

    paths: {
        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore-amd/underscore',
        moment: 'bower_components/moment/moment',
        facebook: '//connect.facebook.net/en_US/all',
        enquire: 'bower_components/enquire/dist/enquire',

        /* alias all marionette libs */
        'backbone.marionette': 'bower_components/backbone.marionette/lib/core/backbone.marionette',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: 'bower_components/requirejs-text/text',
        tmpl: '../templates',

        /* handlebars from the require handlerbars plugin below */
        handlebars: 'bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: 'bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: 'bower_components/require-handlebars-plugin/hbs/json2',
        hbs: 'bower_components/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true
    }
});

// IE9 doesn't instantiate the console object until the
// dev tools are opened.  This also has the nasty effect
// of uncaught exceptions stopping the script.
window.console = window.console || {
    log: function(output) {
    }
};

if (!window.location.origin) {
  window.location.origin =
    window.location.protocol + "//" +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port: '');
}
