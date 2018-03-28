module.exports = function (grunt) {

  grunt.config.set('cssmin', {
    dist: {
      dest: '.tmp/public/min/production.min.css',
      src: ['.tmp/public/concat/production.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
