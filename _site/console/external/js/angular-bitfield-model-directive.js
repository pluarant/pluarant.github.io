'use strict';

//derived from https://github.com/jvdvleuten/angular-bits-flag-directive 
//Yusuf
angular.module('bitsFlag', []).directive('ngBitsFlag', function () {
    return {
        restrict: 'A',
        scope: {
            value: '=ngBitsFlag',
            model: '=ngBitsModel'
        },
        link: function (scope, element) {
            var checkbox = element[0];
            element.on('change', function () {
                scope.$apply(function () {
                    if (checkbox.checked) {
                        scope.model |= scope.value;
                    } else {
                        scope.model &= ~scope.value;
                    }
                });
            });
            scope.$watch('model', function () {
                checkbox.checked = (scope.model & scope.value) == scope.value;
            });
        }
    };
});

angular.module('bitsComplementFlag', []).directive('ngBitsComplementFlag', function () {
    return {
        restrict: 'A',
        scope: {
            value: '=ngBitsComplementFlag',
            model: '=ngBitsComplementModel'
        },
        link: function (scope, element) {
            var checkbox = element[0];
            element.on('change', function () {
                scope.$apply(function () {
                    if (checkbox.checked) {
                        scope.model &= ~scope.value;
                    } else {
                        scope.model |= scope.value;
                    }
                });
            });
            scope.$watch('model', function () {
                checkbox.checked = (scope.model & scope.value) != scope.value;
            });
        }
    };
});
