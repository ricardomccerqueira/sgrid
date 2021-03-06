module.exports = function(grunt) {
  grunt.file.setBase('./');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'src/js/application.js': ['src/coffee/*.coffee']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'www/assets/js/application.js': 'src/js/application.js'
        }
      }
    },
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          environment: 'development',
          force: true
        }
      },
      production: {
        options: {
          config: 'config.rb',
          environment: 'production',
          cssDir: 'www/assets/css/',
          force: true
        }
      }
    },
    haml: {
      app: {
        files: {
            "src/html/index.html": "src/haml/index.html.haml"
        },
        options: {
            templatize: false
        }
      }
    },
    htmlcompressor: {
      compile: {
        files: {
          'www/index.html': 'src/html/index.html'
        },
        options: {
          type: 'html',
          preserveServerScript: true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        event: 'all'
      },
      hamlsrc: {
        files: ['src/haml/**/*.haml'],
        tasks: ['haml']
      },
      coffee: {
        files: 'src/coffee/**/*.coffee',
        tasks: 'coffee'
      },
      js: {
        files: ['src/js/*.js'],
        tasks: 'uglify'
      },
      css: {
        files: 'src/sass/**/*.sass',
        tasks: 'compass'
      },
      htmlcompressor: {
        files: 'src/html/*',
        tasks: 'htmlcompressor'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-htmlcompressor');

  grunt.registerTask('default', ['watch']);
}; 