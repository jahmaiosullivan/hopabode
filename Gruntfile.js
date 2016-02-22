module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            dev: {
                tasks: ['nodemon','watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-migrate/jquery-migrate.js',
                    'bower_components/modernizr/modernizr.js'
                ],
                dest: 'public/javascripts/production.js'
            },
            css: {
                src: [
                    'public/stylesheets/css/foundation.css',
                    'public/stylesheets/css/main.css'
                ],
                dest: 'public/stylesheets/css/production.css'
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                sourceMapName: function (filePath) {
                    return filePath + '.map';
                }
            },
            build: {
                files: {
                    'public/javascripts/production.min.js': [
                        'public/javascripts/production.js'
                    ],
                    'public/javascripts/main.min.js': 'public/javascripts/main.js'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images/charts',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/images/build/'
                }]
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ignore: [
                        'node_modules/**',
                        'public/**/*.js',
                        'bower_components/**'
                    ],
                    ext: 'js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/javascripts/*.js'],
                tasks: ['newer:concat', 'newer:uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['public/stylesheets/scss/*.scss', 'bower_components/**/*.scss'],
                tasks: ['newer:sass', 'newer:concat', 'cssmin', 'newer:uglify'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    sourcemap: 'none'
                },
                // generate css file from every scss file in the folder
                files: grunt.file.expandMapping(['public/stylesheets/scss/*.scss'], 'css', {
                    rename: function (dest, matched) {
                        return matched.replace(/\/scss\//, '/' + dest + '/').replace(/\.scss$/, '.css');
                    }
                })
            },
            bower: {
                options: {                       // Target options
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {                         // Dictionary of files
                    'public/stylesheets/css/foundation.css': 'bower_components/foundation/scss/foundation.scss',
                    'public/stylesheets/css/normalize.css': 'bower_components/foundation/scss/normalize.scss'
                }
            }
        },
        clean: {
            js: {
                src: [
                    'public/javascripts/production.min.js',
                    '**/*.min.js.map'
                ]
            },
            css: {
                src: [
                    'public/stylesheets/**/*.css',
                    'public/stylesheets/**/*.css.map'
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/stylesheets/css',
                    ext: '.min.css'
                }]
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [  'newer:concat', 'cssmin', 'newer:uglify',  'concurrent']);
    grunt.registerTask('run', ['newer:concat', 'cssmin', 'newer:uglify']);

};