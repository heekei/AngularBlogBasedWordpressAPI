// (function () {
    'use strict';

    angular
        .module('footerModule', [
            'blogOnAngularJsApp'
        ])
        .directive('footerDir', function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: 'footer_tpl.html'
            };
        });

// }());