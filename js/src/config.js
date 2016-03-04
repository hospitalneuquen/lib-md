// Módulos para cargar
var requiredModules = [
    // Core
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    // UI
    'ngMaterial',
    // Other
    // 'angularLoad',
    // 'pasvaz.bindonce',
    // 'ngFileUpload',
    //'textAngular',
    'angular-jwt',

    // Global & Plex
    'global',
    'plex'
];

// Crea el módulo principal de la aplicación (app)
angular
    .module('app', requiredModules)
    .config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
//    .config(['$locationProvider', '$httpProvider', '$provide', function($locationProvider, $httpProvider, $provide) {
        // TODO: Verificar si es necesario habilitar esta línea para celulares
        //$locationProvider.html5Mode(false);

        // TextAngular
        // $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
        //     taOptions.forceTextAngularSanitize = false;
        //     taOptions.toolbar = [
        //         ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo'],
        //         ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        //     ];
        //     return taOptions;
        // }]);

        // Convierte fechas
        $httpProvider.defaults.transformResponse.unshift(function(data) {
            // Parsea fechas de formato .NET en objetos Date
            var rvalidchars = /^[\],:{}\s]*$/;
            var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
            var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
            var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
            var dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;
            var dateNet = /\/Date\((-?\d+)(?:-\d+)?\)\//i;

            var replacer = function(key, value) {
                if (typeof(value) === "string") {
                    if (dateISO.test(value)) {
                        return new Date(value);
                    }
                    if (dateNet.test(value)) {
                        return new Date(parseInt(dateNet.exec(value)[1], 10));
                    }
                }
                return value;
            };

            if (data && typeof(data) === "string" && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return JSON.parse(data, replacer);
            } else {
                return data;
            }
        });
    }])
    .run(['$rootScope', 'Global', 'Plex', 'Session', function($rootScope, Global, Plex, Session) {
        angular.extend($rootScope, {
            currentTheme: 'cosmo',
            // Acceso global a servicios
            Global: Global,
            Plex: Plex,
            Session: Session,
        });
    }]);
