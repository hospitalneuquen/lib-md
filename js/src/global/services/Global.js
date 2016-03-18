/**
 *
 * @ngdoc service
 * @module global
 * @name Global
 * @description
 * Funciones reusables para aplicaciones
 *
 **/
angular.module('global').factory('Global', ['$q', '$filter', '$window', '$document', '$timeout', function($q, $filter, $window, $document, $timeout) {
    return {
        _initPromises: [],
        _searchCache: [],
        init: function(promise) {
            this._initPromises.push(promise);
        },
        // Este método es llamado por Plex para ver si se han ejecutado todos los bloques de inicialización
        waitInit: function() {
            return $q.all(this._initPromises);
        },

        /**
         *
         * @ngdoc method
         * @name Global#matchText
         * @param {String} query Término a buscar
         * @param {String} text String en donde se buscará el término
         * @description Devuelve ```true``` si el ```query``` existe en ```text``` ignorando signos diacríticos (acentos, ñ, etc.)
         *
         * Ejemplo:
         *
         *          Global.matchText("El césped es verde", "cesped") // devuelve true
         *          Global.matchText("El césped es verde", "rojo") // devuelve false
         **/
        matchText: function(text, query) {
            $window.alert("Select2.util.stripDiacritics NO IMPLEMENTADO!!!! ");
            //return Select2.util.stripDiacritics('' + text).toUpperCase().indexOf(Select2.util.stripDiacritics('' + query).toUpperCase()) >= 0;
        },

        /**
         *
         * @ngdoc method
         * @name Global#getMatches
         * @param {promise} promise Promise que devuelve un array de objetos
         * @param {String | Number | Array} query Indica el parámetro para buscar según el tipo de datos:
         *   - ```String```: Indica el texto a buscar en los objetos utilizando la funcion ```getTextFunction()```
         *   - ```Number```: Indica un id para buscar en la propiedad ```id``` de los objetos
         *   - ```Array```: Indica un conjunto de ids para buscar en la propiedad ```id``` de los objetos
         * @param {promise} getTextFunction Función que permite buscar por un string. Por defecto utiliza el campo 'nombre'.
         * @param {String} orderBy Indica el nombre de una propiedad por la cual se ordenarán los resultados
         * @description Espera los resultados de una promise y devuele los items indicados por query
         **/
        getMatches: function(promise, query, getTextFunction, orderBy) {
            // Define getTextFunction()
            if (!getTextFunction)
                getTextFunction = function(item) {
                    return item.nombre;
                };

            // Matchea items
            if (query) {
                var self = this;
                promise = promise.then(function(data) {
                    var matches;
                    // 1º Busca por texto
                    if (angular.isString(query)) {
                        matches = [];
                        for (var l = 0; l < data.length; l++) {
                            if (self.matchText(getTextFunction(data[l]), query))
                                matches.push(data[l]);
                        }
                        return matches;
                    } else
                    // 2º Buscar [id1, id2] of [{id: ...}, {id: ...}]
                    if (angular.isArray(query)) {
                        matches = [];
                        for (var j = 0; j < query.length; j++) {
                            for (var i = 0; i < data.length; i++) {
                                if ((angular.isNumber(query[j]) && data[i].id == query[j]) ||
                                    (angular.isObject(query[j]) && 'id' in query[j] && data[i].id == query[j].id))
                                    matches.push(data[i]);
                            }
                        }
                        return matches;
                    } else
                    // 3º Busca por id o {id: ...}
                    {
                        for (var k = 0; k < data.length; k++) {
                            if ((angular.isNumber(query) && data[k].id == query) ||
                                (angular.isObject(query) && 'id' in query && data[k].id == query.id))
                                return data[k];

                        }
                        return data;
                    }
                });
            }

            // Ordena item
            return promise.then(function(data) {
                if (orderBy)
                    data = $filter("orderBy")(data, orderBy);
                return data;
            });
        },

        /**
         *
         * @ngdoc method
         * @name Global#getById
         * @param {Atring} array Array de objetos
         * @param {String | Number} id Id del objeto a buscar
         * @param {Boolean} throwException Indica si genera un excepción cuando el id no fue encontrado. *Por defecto: false*
         * @description Devuelve el item indicado por id
         *
         * Ejemplo:
         *
         *              var colores = [{
         *                         id: 1,
         *                         nombre: "Rojo"
         *                     }, {
         *                         id: 2,
         *                         nombre: "Verde"
         *                     }];
         *
         *              Global.getById(colores, 2); // devuelve { id: 2, nombre: "Verde" }
         *              Global.getById(colores, 3); // devuelve null
         *              Global.getById(colores, 4, true); // tira una excepción
         **/
        getById: function(array, id, throwException) {
            if (array)
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == id)
                        return array[i];
                }

            if (throwException)
                throw "Id no encontrado";
            return null;
        },

        /**
         * @ngdoc method
         * @name Global#indexById
         * @param {Atring} array Array de objetos
         * @param {String | Number} id Id del objeto a buscar
         * @param {Boolean} throwException Indica si genera un excepción cuando el id no fue encontrado. *Por defecto: false*
         * @description Devuelve el índice del objeto cuyo id sea el especificado
         *
         * Ejemplo:
         *
         *              var colores = [{
         *                         id: 1,
         *                         nombre: "Rojo"
         *                     }, {
         *                         id: 2,
         *                         nombre: "Verde"
         *                     }];
         *
         *              Global.indexById(colores, 2); // devuelve 1
         *              Global.indexById(colores, 3); // devuelve -1
         *              Global.indexById(colores, 4, true); // tira una excepción
         **/
        indexById: function(array, id, throwException) {
            if (array)
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == id)
                        return i;
                }
            if (throwException)
                throw "Id no encontrado";
            else
                return -1;
        },

        /**
         * @ngdoc method
         * @name Global#compareDate
         * @param {Date} date1 Primera fecha
         * @param {Date} date2 Segunda fecha
         * @description Compara dos fechas ignorando la hora. Devuelve:
         *   - ```0``` si las fechas son iguales
         *   - ```> 0``` si [Primera fecha] > [Segunda fecha]
         *   - ```< 0``` si [Primera fecha] < [Segunda fecha]
         **/
        compareDate: function(date1, date2) {
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            d1.setHours(0, 0, 0, 0);
            d2.setHours(0, 0, 0, 0);
            return (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
        },

        /**
         * @ngdoc method
         * @name Global#compareDateTime
         * @param {Date} date1 Primera fecha
         * @param {Date} date2 Segunda fecha
         * @description Compara dos fechas tomando en cuenta la hora. Devuelve:
         *   - ```0``` si las fechas son iguales
         *   - ```> 0``` si [Primera fecha] > [Segunda fecha]
         *   - ```< 0``` si [Primera fecha] < [Segunda fecha]
         **/
        compareDateTime: function(date1, date2) {
            return date1.getTime() - date2.getTime();
        },

        /**
         * @ngdoc method
         * @name Global#isToday
         * @param {Date} date Fecha para comparar
         * @description Indica si la fecha coincide con el día actual
         *
         **/
        isToday: function(date) {
            return this.compareDate(date, new Date()) === 0;
        },

        /**
         * @ngdoc method
         * @name Global#isEmpty
         * @param {Object} obj Objeto
         * @description Indica si el objeto está vacío. En el caso de arrays, si el mismo no contiene ningún elemento
         **/
        isEmpty: function(obj) {
            return (obj === null || obj === undefined || obj === "" || (angular.isArray(obj) && !obj.length) || angular.equals(obj, {}));
        },
        /**
         * @ngdoc method
         * @name Global#loadScript
         * @description Dynamically loads the given script
         * @param src The url of the script to load dynamically
         * @returns {Promise} Promise that will be resolved once the script has been loaded.
         */
        loadScript: function(url) {
            var cache = this.cache;
            var promise = cache.get('loadScript', url, null);
            if (!promise) {
                var deferred = $q.defer();

                var element = $document[0].createElement('script');
                element.src = url;
                $document[0].body.appendChild(element);

                element.onload = element.onreadystatechange = function(e) {
                    $timeout(function() {
                        deferred.resolve(e);
                    });
                };
                element.onerror = function(e) {
                    $timeout(function() {
                        deferred.reject(e);
                    });
                };
                cache.put('loadScript', url, null, deferred.promise);
                promise = deferred.promise;
            }
            return promise;
        },
        /**
         * @ngdoc method
         * @name Global#loadScript
         * @description Dynamically loads the given CSS file
         * @param src The url of the script to load dynamically
         * @returns {Promise} Promise that will be resolved once the script has been loaded.
         */
        loadCSS: function(url) {
            var cache = this.cache;
            var promise = cache.get('loadScript', url, null);
            if (!promise) {
                var deferred = $q.defer();

                var element = $document[0].createElement('link');
		        element.rel = 'stylesheet';
		        element.type = 'text/css';
		        element.href = url;
                $document[0].head.appendChild(element);

                element.onload = element.onreadystatechange = function(e) {
                    $timeout(function() {
                        deferred.resolve(e);
                    });
                };
                element.onerror = function(e) {
                    $timeout(function() {
                        deferred.reject(e);
                    });
                };
                cache.put('loadScript', url, null, deferred.promise);
                promise = deferred.promise;
            }
            return promise;
        },
        /**
         * @ngdoc method
         * @name Global#minify
         * @param {Object} obj Objeto a minificar
         * @param {ignoreRootId} options No minifica el objeto principal si tiene un 'id'
         * @description Minifica las propiedades de un objeto de acuerdo a las siguientes reglas:
         *   - Ignora propidades ```null```, ```undefined``` o ```""```
         *   - Ignora arrays sin elementos
         *   - Si un objeto o subobjeto tiene una propiedad ```id``` sólo devuelve el valor de esa propiedad (excepto si se especifica ```ignoreRootId```)
         **/
        minify: function(obj, ignoreRootId) {
            var val;
            if (angular.isArray(obj)) {
                val = [];
                for (var i = 0; i < obj.length; i++) {
                    var temp = this.minify(obj[i]);
                    if (!this.isEmpty(temp))
                        val.push(temp);
                }
            } else {
                if (angular.isDate(obj)) {
                    val = obj;
                } else {
                    if (angular.isObject(obj)) {
                        // Si tiene una propiedad "id" devuelve sólo ese valor
                        if (obj.id && !ignoreRootId) {
                            val = obj.id;
                        } else {
                            // Si no, devuelve el objeto completo
                            val = {};
                            for (var p in obj) {
                                var temp2 = this.minify(obj[p]);
                                if (!this.isEmpty(temp2))
                                    val[p] = temp2;
                            }
                        }
                    } else {
                        val = obj;
                    }
                }
            }
            return val;
        },
        cache: {
            data: {},
            get: function(key, id, params) {
                return this.data[key + '/' + id + '/' + JSON.stringify(params)];
            },
            put: function(key, id, params, value) {
                this.data[key + '/' + id + '/' + JSON.stringify(params)] = value;
            },
            invalidate: function(key, id) {
                for (var k in this.data) {
                    if (k.indexOf(key + '/' + id + '/') === 0) {
                        delete this.data[k];
                    }
                }
            }
        },
        // [DEBUG] Es una función sólo para debugging. Indica la cantidad de watches que hay en un momento dato. Es utilizada para analizar la performance.
        watchCount: function() {
            var watchers = [];

            var f = function(element) {
                if (element.data().hasOwnProperty('$scope')) {
                    angular.forEach(element.data().$scope.$$watchers, function(watcher) {
                        watchers.push(watcher);
                    });
                }
                angular.forEach(element.children(), function(childElement) {
                    f(angular.element(childElement));
                });
            };

            f(angular.element('body'));
            return watchers.length;
        }
    };
}]);
