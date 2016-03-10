angular.module('plex').directive("form", function () {
    'use strict';

    return {
        restrict: "E",
        link: function (scope, element, attrs) {
            element.attr("novalidate", "novalidate");
            element.attr("autocomplete", "off");
        }
    };
});
