/**
 * Compiles SASS Compass files into CSS.
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function(grunt) {

	grunt.config.set('compass', {
		dev: {
			options: {
				sassDir: 'assets/styles/sass',
				cssDir: '.tmp/public/styles',
				imagesDir: '.tmp/public/images',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/styles/fonts',
				httpPath: "/",
				relativeAssets: false,
				raw: 'http_images_path = \"/images\";',
				httpGeneratedImagesPath: '/images',
				httpFontsPath: '/styles/fonts'
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-compass');
};
