module.exports = function (grunt) {
     grunt.initConfig({
        clean: ["build"],
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/lib",
                    removeCombined: true,
                    mainConfigFile: "./app/main.js",
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    out: "build/js/app.js",
                    name: '../main'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'img/*',
                            'css/app.min.css',
                            'index.html'
                        ],
                        dest: 'build/'
                    },{
                          expand: true,
                          cwd: 'app',
                          src: [
                              'require.js'
                          ],
                          dest: 'build/js/'
                      }
                ]
            }
        },

        useminPrepare: {
            html: ['build/index.html'],
            options: {
                root: '.',
                dest: 'build'
            }
        },
        usemin: {
            html: ['build/index.html'],
            options: {
                root: '.',
                dest: 'build'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        },
        replace: {
          appbuild: {
              src: ['build/index.html'],
              overwrite: true,
              replacements: [{
                  from: 'app/main',
                  to: "js/app"
              },{
                from: 'app/require.js',
                to: "js/require.js"
              }]
          },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('default', ['clean', 'requirejs', 'copy', 'useminPrepare', 'usemin', 'replace', 'htmlmin']);
};
