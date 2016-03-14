module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: false
      },
      stylelib: {
        src: [
        '<%= dirs.devcsslib %>/bootstrap.min.css',
        '<%= dirs.devcsslib %>/jasny-bootstrap.css',
        '<%= dirs.devcsslib %>/jquery.mCustomScrollbar.min.css',
        '<%= dirs.devcsslib %>/MegaNavbar.css',
        '<%= dirs.devcsslib %>/bootstrap-datetimepicker.min.css',
        '<%= dirs.devcsslib %>/font-awesome.min.css',
        '<%= dirs.devcsslib %>/ionicons.css',
        '<%= dirs.devcsslib %>/helveticaneue.css',
        ],
        dest: '<%= dirs.buildcsslib %>/compiled-libs.css'
      },
      lib: {
        src: [
        '<%= dirs.devjslib %>/jquery-1.11.3.min.js',
        '<%= dirs.devjslib %>/moment-with-locales.min.js',
        '<%= dirs.devjslib %>/bootstrap.min.js',
        '<%= dirs.devjslib %>/jasny-bootstrap.min.js',
        '<%= dirs.devjslib %>/bootstrap-datetimepicker.js',
        '<%= dirs.devjslib %>/bootstrap-toolkit.min.js',
        '<%= dirs.devjslib %>/validator.min.js',
        '<%= dirs.devjslib %>/jquery.matchHeight.js',
        '<%= dirs.devjslib %>/jquery.mCustomScrollbar.concat.min.js',


        ],
        dest: '<%= dirs.buildjslib %>/compiled-libs.js'
      },
      site: {
        src: [
        '<%= dirs.devjs %>/*.js',
        '!<%= dirs.devjs %>/__empty-js-template.js',

        ],
        dest: '<%= dirs.buildjs %>/default.js'
      }
    },
    less: {
      development: {
        files: {
          'assets/main.css': 'assets/main.less'
        }
      }
    },
    watch: {
      styles: {
        files: ['assets/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['less', 'watch']);

};