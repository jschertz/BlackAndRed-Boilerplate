module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'sync:dev',
		'compass:dev',
		'coffee:dev'
	]);
};
