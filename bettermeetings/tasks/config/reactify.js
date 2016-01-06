module.exports = function (grunt) {

    grunt.config.set('reactify', {
        '[Destination folder]': '[folder containing React Components]/**/*.jsx'
    });

    grunt.loadNpmTasks('grunt-reactify');
};