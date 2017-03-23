/**
 * main.js
 */
'use strict';
angular.module('ApiModule', [])
    .service('get_pages_by_cateid', ['$http', function ($http) {
        return function (id, pageid, callback) {
            $http({
                url: 'http://heekei.cn/wp-json/wp/v2/posts?categories=' + id + '&page=' + (pageid ? pageid : 1),
                method: 'GET',
                cache: true
            }).then(function (data) {
                callback(data.data);
            }, function (error) {
                console.error(error);
            });
        };
    }])
    .service('get_pages', ['$http', function ($http) {
        return function (id, callback) {
            $http({
                url: 'http://heekei.cn/wp-json/wp/v2/posts?page=' + id,
                method: 'GET',
                cache: true
            }).then(function (data) {
                callback(data.data);
            }, function (error) {
                console.error(error);
            });
        };
    }])
    .service('get_post', ['$http', function ($http) {
        return function (id, callback) {
            $http({
                // url: 'http://heekei.cn/api/get_post/?id=' + id,
                url: 'http://heekei.cn/wp-json/wp/v2/posts/' + id,
                method: 'GET',
                cache: true
            }).then(function (data) {
                data = data.data;
                // return callback(data);
                $http({
                    url: 'http://heekei.cn/api/get_post/?id=' + id,
                    // url: 'http://heekei.cn/wp-json/wp/v2/posts/' + id,
                    method: 'GET',
                    ignoreLoadingBar: true,
                    cache: true
                }).then(function (data2) {
                    data2 = data2.data;
                    data.previous_url = data2.previous_url;
                    data.next_url = data2.next_url;
                    return callback(data);
                }, function (err) {
                    console.error(err);
                });
            });
        };
    }])
    .directive('getCategoriesByPid', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/category_tpl.html',
            controller: ['$scope', '$http', function ($scope, $http) {
                $http({
                    url: 'http://heekei.cn/wp-json/wp/v2/categories?post=' + $scope.pid,
                    method: 'GET',
                    ignoreLoadingBar: true,
                    cache: true
                }).then(function (res) {
                    $scope.categories = res.data;
                }, function (err) { console.error(err); });
            }]
        };
    })
    ;
angular.module('CategoriesModule', ['ApiModule'])
    .controller('CategoriesController', ['$stateParams', '$scope', 'get_pages_by_cateid', function ($stateParams, $scope, get_pages_by_cateid) {
        // console.log($stateParams.id);
        $scope.caller = 'category';
        $scope.cid = $stateParams.cid;
        $scope.pageid = $stateParams.pageid || 1;
        get_pages_by_cateid($scope.cid, $scope.pageid, function (data) {
            $scope.data = data;
        });
    }]
    );

angular.module('PostPageModule', ['ApiModule'])
    .controller('postView', ['$stateParams', '$scope', 'get_post', function ($stateParams, $scope, get_post) {
        $scope.pid = $stateParams.pid;
        $scope.pageid = $stateParams.pageid || 1;
        get_post($scope.pid, function (data) {
            $scope.article = data;
            if (data.previous_url) {
                var startIndex = data.previous_url.toString().lastIndexOf('/') + 1;
                var lastIndex = data.previous_url.length - 5;
                $scope.prevUrl = data.previous_url.toString().substr(startIndex, lastIndex - startIndex);
            }
            if (data.next_url) {
                var startIndex2 = data.next_url.toString().lastIndexOf('/') + 1;
                var lastIndex2 = data.next_url.length - 5;
                $scope.nextUrl = data.next_url.toString().substr(startIndex2, lastIndex2 - startIndex2);
            }
        });
    }]
    );

angular.module('PagesModule', ['ApiModule'])
    .controller('PagesController', ['$stateParams', '$scope', 'get_pages', function ($stateParams, $scope, get_pages) {
        $scope.caller = 'page';
        $scope.pageid = $stateParams.pageid || 1;
        get_pages($scope.pageid, function (data) {
            $scope.data = data;
            // $router
        });
    }]
    );