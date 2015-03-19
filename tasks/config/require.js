module.exports = function(grunt) {
	grunt.config.set('requirejs', {
		dev: {
			options: {
				baseUrl: "assets/js",
				out: "assets/require.js",
				name: 'main',
				optimize: "uglify2",
				include: ['init'],
				insertRequire: ['init'],
				//wrap: true,
				paths: {
					'templates': 'templates'
				},
				mainConfigFile: "assets/js/init.js",
				preserveLicenseComments: false,
				useStrict: true,
				wrap: true,
				pragmasOnSave: {
					//removes Handlebars.Parser code (used to compile template strings) set
					//it to `false` if you need to parse template strings even after build
					excludeHbsParser : true,
					// kills the entire plugin set once it's built.
					excludeHbs: true,
					// removes i18n precompiler, handlebars and json2
					excludeAfterBuild: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
};
