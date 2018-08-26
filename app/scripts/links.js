'use strict';
angular.module('linksModule', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('links', {
                url: '/links',
                title: '友情链接',
                templateUrl: 'views/links.html',
                controller: 'linksController'
            });

    }])
    .controller('linksController', ['$scope', '$http', function ($scope, $http) {
        $http({
            url: '/data/links.json',
            method: 'GET',
            cache: true
        }).then(function (data) {
            $scope.links = data.data;
        });
    }]);
