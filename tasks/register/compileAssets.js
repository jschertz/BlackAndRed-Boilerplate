module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'requirejs:dev',
		'copy:dev',
		'compass:dev',
		'coffee:dev'
	]);
};
