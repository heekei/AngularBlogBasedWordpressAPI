'use strict';
angular.module('ApiModule', [])
    .service('get_pages_by_cateid', ['$http', function ($http) {
        return function (id, pageid, callback) {
            $http({
                url: 'https://www.heekei.cn/api/get_category_posts/?count=10&id=' + id + '&page=' + (pageid ? pageid : 1),
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
                url: 'https://www.heekei.cn/api/get_posts/?count=10&page=' + id,
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
                url: 'https://www.heekei.cn/api/get_post/?id=' + id,
                method: 'GET',
                cache: true
            }).then(function (data) {
                data = data.data;
                return callback(data);
            });
        };
    }])
    .directive('getCategoriesByPid', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/category_tpl.html',
            controller: ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
                $http({
                    url: 'https://www.heekei.cn/wp-json/wp/v2/categories?post=' + $scope.pid,
                    method: 'GET',
                    ignoreLoadingBar: true,
                    cache: true
                }).then(function (res) {
                    $rootScope.categories = res.data;
                    $scope.categories = res.data;
                }, function (err) { console.error(err); });
            }]
        };
    })
    ;
angular.module('CategoriesModule', ['ApiModule'])
    .controller('CategoriesController', ['$rootScope', '$stateParams', '$scope', 'get_pages_by_cateid', '$timeout', function ($rootScope, $stateParams, $scope, get_pages_by_cateid, $timeout) {
        function reqPage() {
            $stateParams.pageid = $scope.pageid;
            get_pages_by_cateid($scope.cid, $scope.pageid, function (data) {
                $scope.data = data;
                $scope.PagerInfo = {
                    count: data.count,//当前页文章数量
                    count_per_page: 10,//每页显示文章数量
                    count_total: data.category.post_count,//所有文章数量
                    pages: data.pages,//所有页数
                    curPage: $scope.pageid//当前页
                };
                $rootScope.$state.current.title = "分类 - " + data.category.title;
                $timeout(function () {
                    angular.element(".read-more").remove();
                });
            });
        }
        $scope.cid = $stateParams.cid;
        $scope.pageid = $stateParams.pageid || 1;
        $scope.jumpToPage = function () {
            reqPage();
        };
        reqPage();

    }]
    );

angular.module('PostPageModule', ['ApiModule'])
    .controller('postView', ['$rootScope', '$stateParams', '$scope', 'get_post', function ($rootScope, $stateParams, $scope, get_post) {
        $scope.pid = $stateParams.pid;
        $scope.pageid = $stateParams.pageid || 1;
        get_post($scope.pid, function (data) {
            $scope.article = data.post;
            $rootScope.$state.current.title = $scope.article.title;
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
    .controller('PagesController', ['$stateParams', '$scope', 'get_pages', '$rootScope', '$state', '$timeout', function ($stateParams, $scope, get_pages, $rootScope, $state, $timeout) {
        function reqPage() {
            get_pages($scope.pageid, function (data) {
                $scope.data = data;
                $scope.PagerInfo = {
                    count: data.count,//当前页文章数量
                    count_total: data.count_total,//所有文章数量
                    count_per_page: 10,//每页显示文章数量
                    pages: data.pages,//所有页数
                    curPage: $scope.pageid//当前页
                };
                $rootScope.$state.current.title = "首页";
                $timeout(function () {
                    angular.element(".read-more").remove();
                });
            });
        }
        $scope.pageid = ($stateParams.pageid && $stateParams.pageid >= 1) ? $stateParams.pageid : 1;
        $scope.jumpToPage = function () {
            reqPage();
        };
        reqPage();

    }]
    );