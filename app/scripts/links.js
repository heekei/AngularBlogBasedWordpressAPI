'use strict';
angular.module('linksModule', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('links', {
                url: '/links',
                title: '友情链接',
                templateUrl: 'views/links.html'
            })
            ;

    }])
    .controller('linksController', ['$scope'], function ($scope) { })
    ;