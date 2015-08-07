'use strict';
var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src/app',
  dist: 'dist',
  build: 'build'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    watch: {
      scripts: {
        files: ['<%= config.app %>/**/*.html','<%= config.app %>/*.jsx', '<%= config.app %>/**/*.js', '<%= config.app %>/**/*.css', '<%= config.app %>/**/*.scss'],
        tasks: ['default']
      }
    },
    jshint: {
      build: [
        '<%= config.app %>/script.jsx',
        '<%= config.app %>/script.js'

      ]
    },
    babel: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                '<%= config.build %>/js/data.js': '<%= config.app %>/data.jsx',
                '<%= config.build %>/js/script.js': '<%= config.app %>/script.jsx'
            }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        mangle: false
      },
      dist: {
        files: {
          '<%= config.dist %>/js/script.min.js': [
            '<%= config.app %>/**/*.js',
            '<%= config.build %>/**/*.js'
          ],
          '<%= config.dist %>/js/lib.min.js': [
            '<%= bower.directory %>/jquery/dist/jquery.js',
            '<%= bower.directory %>/react/react-with-addons.js'
          ]
        }
      }
    },
    sass: { 
      dist: {
        options: {
          style: 'expand'
        },
        files: {
          '<%= config.build %>/scss/styles_compiled.css': ['<%= config.app %>/scss/main.scss']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
              '<%= config.dist %>/css/styles.min.css': ['<%= config.app %>/**/*.css', '<%= config.build %>/**/*.css']
        }
      }
    },
    copy: {
      dist: {
        files: [
              {cwd: '<%= config.app %>', src: '**/*.html', dest: '<%= config.dist %>/', expand: true},
              {cwd: '<%= config.app %>', src: 'assets/**/*', dest: '<%= config.dist %>/', expand: true},
              {cwd: '<%= config.app %>', src: 'font/**/*', dest: '<%= config.dist %>/', expand: true}
        ]
      }
    },
    clean: ['<%= config.build %>']

  });
  
  grunt.registerTask('default', [
    'jshint',
    'babel',
    'sass',
    'uglify',
    'cssmin',
    'copy',
    'clean'
  ]);
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
};