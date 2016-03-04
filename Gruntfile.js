module.exports = function(grunt) {
    // Permite observar cambios en archivos
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Permite concatenar archivos
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Permite compilar LESS
    grunt.loadNpmTasks('grunt-contrib-less');
    // Permite copiar archivos
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Orden de las tareas
    grunt.registerTask('default', ['concat:js', /*'less:global',*/ 'less:fontawesome', 'copy']);

    grunt.initConfig({
        // Configuración de watch
        watch: {
            all: {
                files: ['Gruntfile.js', 'js/src/**/*.*', 'css/src/**/*.*'],
                tasks: ['default'],
                options: {
                    reload: true,
                    atBegin: true,
                }
            }
        },
        // Configuración de la tarea grunt-contrib-concat
        concat: {
            options: {
                //banner: '<%= banner %>',
                stripBanners: false,
                separator: '\n',
            },
            js: { // Archivos .js
                nonull: true,
                dest: './js/dist/lib.js',
                src: [
                    // 'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'js/src/patches/angular-locale_es-ar.js',

                    // UI
                    'bower_components/angular-aria/angular-aria.js',
                    'bower_components/angular-messages/angular-messages.js',
                    'bower_components/angular-material/angular-material.js',

                    // Other
                    // 'bower_components/ocLazyLoad/dist/ocLazyLoad.min.js',
                    // 'bower_components/angular-bindonce/bindonce.js',
                    // 'bower_components/ng-file-upload/ng-file-upload.js',
                    'bower_components/angular-jwt/dist/angular-jwt.js',
                    // 'js/src/patches/angular-load.js',

                    // Global
                    'js/src/global/modules/Global.js',
                    'js/src/global/services/Global.js',
                    'js/src/global/services/Session.js',
                    'js/src/global/services/Server.js',
                    'js/src/global/controllers/session.js',

                    // Plex
                    'js/src/plex/lib/moment/moment.js',
                    'js/src/plex/lib/moment/es.js',
                    // 'js/src/plex/lib/textangular/rangy-core.js',
                    // 'js/src/plex/lib/textangular/rangy-selectionsaverestore.js',
                    // 'js/src/plex/lib/textangular/textAngularSetup.js',
                    // 'js/src/plex/lib/textangular/textAngular.js',
                    'js/src/plex/modules/plex.js',
                    'js/src/plex/services/plex.js',
                    'js/src/plex/services/PlexResolver.js',
                    'js/src/plex/directives/form.js',
                    'js/src/plex/directives/plexEnter.js',
                    'js/src/plex/directives/plexFocus.js',
                    'js/src/plex/directives/plexInclude.js',
                    'js/src/plex/directives/plexFilter.js',
                    'js/src/plex/directives/plexView.js',
                    // 'js/src/plex/directives/title.js',
                    'js/src/plex/filters/fromNow.js',
                    // 'js/src/plex/directives/plexMap.js',
                    // 'js/src/plex/directives/plexChart.js',
                    // 'js/src/plex/directives/plexCanvas.js',

                    // Config
                    'js/src/config.js'
                ]
            },
        },
        // Configuración de la tarea grunt-contrib-less
        less: {
            global: {
                files: [{
                    src: ['css/src/plex/global.less'],
                    dest: 'css/src/plex/global.css'
                }]
            },
            fontawesome: {
                files: [{
                    src: ['bower_components/font-awesome/less/font-awesome.less'],
                    dest: '.tmp/font-awesome.css'
                }],
                options: {
                    modifyVars: {
                        'fa-font-path': '"fonts"',
                    }
                },
            },
        },
        // Configuración de la tarea copy
        copy: {
            medical: {
                cwd: 'css/src/webfont-medical-icons/fonts',
                src: '**/*',
                dest: 'css/dist/fonts',
                expand: true
            },
            fontawesome: {
                cwd: 'bower_components/font-awesome/fonts',
                src: '**/*',
                dest: 'css/dist/fonts',
                expand: true
            },

            temp: {
                cwd: 'bower_components/angular-material',
                src: '*.css',
                dest: 'css/dist',
                expand: true
            },
        }
    });
};
