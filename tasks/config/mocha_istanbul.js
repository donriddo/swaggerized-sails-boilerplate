module.exports = function (grunt) {
  grunt.config.set('mocha_istanbul', {
    coverage: {
      options: {
        coverageFolder: 'coverage',
        mask: '**/*.js',
        root: 'api/controllers'
      },
      src: 'test'
    }
  });
  grunt.loadNpmTasks('grunt-mocha-istanbul');
};
