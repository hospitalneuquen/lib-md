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
    grunt.registerTask('default', ['concat:js', 'less:roboto', 'concat:css', 'copy']);

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
                    'bower_components/angular-material-data-table/dist/md-data-table.js',
                    'bower_components/moment/moment.js',
                    'bower_components/moment/locale/es.js',
                    'bower_components/mdPickers/dist/mdPickers.js',

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
                    // 'js/src/plex/lib/textangular/rangy-core.js',
                    // 'js/src/plex/lib/textangular/rangy-selectionsaverestore.js',
                    // 'js/src/plex/lib/textangular/textAngularSetup.js',
                    // 'js/src/plex/lib/textangular/textAngular.js',
                    'js/src/plex/modules/plex.js',
                    'js/src/plex/services/plex.js',
                    'js/src/plex/services/PlexResolver.js',
                    'js/src/plex/directives/form.js',
                    'js/src/plex/directives/plex.js',
                    'js/src/plex/directives/plexEnter.js',
                    'js/src/plex/directives/plexFocus.js',
                    'js/src/plex/directives/plexInclude.js',
                    'js/src/plex/directives/plexFilter.js',
                    'js/src/plex/directives/plexView.js',
                    'js/src/plex/directives/plexSubmit.js',
                    // 'js/src/plex/directives/title.js',
                    'js/src/plex/filters/fromNow.js',
                    // 'js/src/plex/directives/plexMap.js',
                    'js/src/plex/directives/plexChart.js',
                    // 'js/src/plex/directives/plexCanvas.js',

                    // Config
                    'js/src/config.js'
                ]
            },
            css: { // Archivos .css
                nonull: true,
                dest: './css/dist/lib.css',
                src: [
                    'bower_components/angular-material/angular-material.css',
                    'bower_components/angular-material-data-table/dist/md-data-table.css',
                    'bower_components/mdPickers/dist/mdPickers.css',
                    'bower_components/angular-motion/dist/angular-motion.css',
                    'bower_components/material-design-icons/iconfont/material-icons.css',
                    'bower_components/mdi/css/materialdesignicons.css',
                    'css/src/webfont-medical-icons/wfmi-style.css',
                    '.tmp/roboto-fontface.css'
                ]
            },
        },
        // Configuración de la tarea grunt-contrib-less
        less: {
            // global: {
            //     files: [{
            //         src: ['css/src/plex/global.less'],
            //         dest: 'css/src/plex/global.css'
            //     }]
            // },
            roboto: {
                files: [{
                    src: ['bower_components/roboto-fontface/css/roboto-fontface.less'],
                    dest: '.tmp/roboto-fontface.css'
                }],
                options: {
                    modifyVars: {
                        'roboto-font-path': '"fonts"',
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
            materialIcons: {
                cwd: 'bower_components/material-design-icons/iconfont/',
                src: '**/*',
                dest: 'css/dist',
                expand: true
            },
            materialdesignicons: {
                cwd: 'bower_components/mdi/fonts/',
                src: '**/*',
                dest: 'css/dist/fonts',
                expand: true
            },
            roboto: {
                cwd: 'bower_components/roboto-fontface/fonts/',
                src: '**/*',
                dest: 'css/dist/fonts',
                expand: true
            },
            hightcharts: {
                cwd: 'bower_components/highcharts/',
                src: 'highcharts.js',
                dest: 'js/dist',
                expand: true
            },
        }
    });
};
