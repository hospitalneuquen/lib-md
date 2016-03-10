/**
 * @ngdoc directive
 * @module plex
 * @name plex
 * @description
 * Decora un ```input[type=text]``` de acuerdo al tipo de datos y agrega validación de Angular + Bootstrap
 * El tipo de datos puede ser:
 * - **text**: Valor por defecto.
 * - **html**: Decora el campo con un editor HTML. Actualmente funciona como adaptador de la directiva ```text-angular``` (https://github.com/fraywing/textAngular).
 * - **int**: Permite sólo valores numéricos enteros.
 * - **float**: Permite sólo valores numéricos enteros o decimales.
 * - **date**: Decora el campo con un selector de fecha. Actualmente funciona como adaptador de la directiva ```bs-datepicker``` (http://mgcrea.github.io/angular-strap/#/datepickers).
 * - **time**: Decora el campo con un selector de hora. Actualmente funciona como adaptador de la directiva ```bs-timepicker``` (http://mgcrea.github.io/angular-strap/#/timepickers).
 * - **bool**: Decora el campo con un slider booleano. **ATENCIÓN: ¡Actualmente no funciona con la última versión de Angular!
 * - Si no es ninguno de los tipos de datos anteriores, asume que es un {@link module:plex.directive:plex-select}.
 *
 * @priority 598
 * @restrict EAC
 * @param {string=} label Agrega un elemento **<label>** antes del campo de texto
 * @param {string=} hint Agrega un bloque de ayuda debajo del campo de texto
 * @param {string=} prefix Agrega un prefijo antes del campo de texto
 * @param {string=} suffix Agrega un sufijo después del campo de texto
 * @param {boolean=} selectOnly *Sólo válida para tipo de datos ```date```*. Muestra sólo el selector y no permite escribir.
 * @param {string=} date-format *Sólo válida para tipo de datos ```date```*. Formato de la fecha a mostrar. Para más opciones leer la documentación de http://mgcrea.github.io/angular-strap/#/datepickers
 * @param {string=} true *Sólo válida para tipo de datos ```bool```*. Texto a mostrar para el valor ```true``` ("Si" por defecto)
 * @param {string=} false *Sólo válida para tipo de datos ```bool```*. Texto a mostrar para el valor ```false``` ("No" por defecto)
 * @example
    <example module="app" deps="" animate="false">
      <file name="index.html">
        <div class="row">
            <div class="col-xs-6"><input type="text" label="Ingrese nombre de la persona" ng-model="persona.nombre" plex /></div>
            <div class="col-xs-6"><input type="text" label="Fecha de nacimiento" ng-model="persona.nacimiento" plex="date" /></div>
        </div>
        <div class="row">
            <div class="col-xs-6"><input type="text" label="Altura" ng-model="persona.altura" plex="float" suffix="Mts" /></div>
            <div class="col-xs-6"><input type="text" label="¿Tiene obra social?" ng-model="persona.obraSocial" plex="bool" /></div>
        </div>
        <pre ng-show="persona">{{persona | json}}</pre>
      </file>
    </example>
 **/
angular.module('plex').directive("plex", ['$compile', function($compile) {
    return {
        restrict: 'A',
        require: ['?ngModel', '^?form'],
        //priority: 598, // Para que el postLink ejecute último. ng-if tiene prioridad 600
        //compile: function(element, attrs) {
        //    return {
        link: function(scope, element, attrs, controllers) {
            var modelController = controllers[0];
            var formController = controllers[1];

            // Genera html
            var subScope = scope.$new();
            var parent = element.parent("md-input-container");
            var msgRequired = angular.element('<ng-message ng-show="showRequired" class="am-fade">Requerido</ng-message>');
            element.after(msgRequired);
            var msgInvalid = angular.element('<ng-message ng-show="showInvalid" class="am-fade">Valor no válido</ng-message>');
            element.after(msgInvalid);
            $compile(msgRequired)(subScope);
            $compile(msgInvalid)(subScope);

            // Observa cambios
            var validator = function(element, modelController) {
                if (modelController && !modelController.$pristine && modelController.$error && Object.keys(modelController.$error).length > 0) {
                    subScope.showRequired = modelController.$error.required;
                    subScope.showInvalid = !subScope.showRequired;
                    parent.addClass('md-input-invalid');
                } else {
                    subScope.showRequired = false;
                    subScope.showInvalid = false;
                    parent.removeClass('md-input-invalid');
                }
            };
            if (modelController) {
                modelController.$parsers.push(function(value) {
                    validator(element, modelController);
                    return value;
                });
                scope.$watch(function() {
                    return modelController.$error;
                }, function() {
                    validator(element, modelController);
                }, true);
            }

            // Eventos
            scope.$on("$plex-before-submit", function(event, submitController) {
                // Dirty = true (i.e. fuerza que muestre los campos requeridos)
                if (modelController && formController == submitController) {
                    modelController.$setDirty();
                    validator(element, modelController);
                }
            });
        }
    };
    //};
}]);
