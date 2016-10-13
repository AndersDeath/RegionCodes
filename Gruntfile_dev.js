'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.initConfig({
        watch: {
            files: "app/components/less/*.less",
            tasks: ["less","cssmin"]
        },
        less: {
            development: {
                files: {
                    "css/app.css": [
                      "app/components/less/Main.less"
                    ]
                }
            },
        },
        cssmin: {
          compress: {
            files: {
              'css/app.min.css': ['css/app.css']
            }
          }
        }
    });
     grunt.registerTask('default', ['watch','cssmin']);
};
