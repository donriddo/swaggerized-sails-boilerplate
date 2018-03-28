/**
 * compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function (grunt) {

  grunt.config.set('cssmin', {
    dist: {
      dest: '.tmp/public/min/production.min.css',
      src: ['.tmp/public/concat/production.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
