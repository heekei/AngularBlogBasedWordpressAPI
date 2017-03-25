'use strict';
angular.module('aboutModule', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                title: '关于',
                templateUrl: 'views/about.html'
            })
            ;

    }])
    .controller('aboutController', ['$scope'], function ($scope) { })
    ;