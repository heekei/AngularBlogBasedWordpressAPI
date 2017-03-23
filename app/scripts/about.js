/**
 * about.js
 */
'use strict';
angular.module('aboutModule', [])
    .config(['$stateProvider', '$urlRouterProvider'], function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('about', {
                url: 'about',
                templateUrl: 'views/about.html'
            })
    })
    .controller('aboutController', ['$scope'], function ($scope) { })
    ;