'use strict';
angular.module('ApiModule', [])
    .service('get_pages_by_cateid', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {
        return function (id, pageid, callback) {
            $http({
                url: $rootScope.API.get_category_posts + '?count=10&id=' + id + '&page=' + (pageid ? pageid : 1),
                method: 'GET',
                cache: true
            }).then(function (data) {
                callback(data.data);
            }, function (error) {
                $state.go('NotFound', {
                    error: error
                });
            });
        };
    }])
    .service('get_pages', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {
        return function (id, callback) {
            $http({
                url: $rootScope.API.get_posts + '?pagesize=10&page=' + id,
                method: 'GET',
                cache: true
            }).then(function (data) {
                callback(data.data);
            }, function (error) {
                $state.go('NotFound', {
                    error: error
                });
            });
        };
    }])
    .service('get_post', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {
        return function (id, callback) {
            $http({
                url: $rootScope.API.get_post + id,
                method: 'GET',
                cache: true
            }).then(function (data) {
                return callback(data.data);
            }, function (error) {
                $state.go('NotFound', {
                    error: error
                });
            });
        };
    }]);
angular.module('categoriesModule', ['ApiModule'])
    .controller('CategoriesController', ['$rootScope', '$stateParams', '$scope', 'get_pages_by_cateid', '$timeout', function ($rootScope, $stateParams, $scope, get_pages_by_cateid, $timeout) {
        function reqPage() {
            $stateParams.pageid = $scope.pageid;
            get_pages_by_cateid($scope.cid, $scope.pageid, function (data) {
                $scope.data = data.Result.data;
                $scope.PagerInfo = data.Result.pager;
                $rootScope.$state.current.title = '分类 - ' + data.category.title;
                $timeout(function () {
                    angular.element('.read-more').remove();
                });
            });
        }
        $scope.cid = $stateParams.cid;
        $scope.pageid = $stateParams.pageid || 1;
        $scope.jumpToPage = function () {
            $scope.data = {}; //发起请求前清空数据
            reqPage();
        };
        reqPage();

    }]);

angular.module('PostPageModule', ['ApiModule'])
    .controller('postView', ['$rootScope', '$stateParams', '$scope', 'get_post', function ($rootScope, $stateParams, $scope, get_post) {
        $scope.pid = $stateParams.pid;
        $scope.pageid = $stateParams.pageid || 1;
        get_post($scope.pid, function (data) {
            $scope.article = data.Result[0];
            $scope.article.content = unescape($scope.article.content);
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
    }]);

angular.module('PagesModule', ['ApiModule'])
    .controller('PagesController', ['$stateParams', '$scope', 'get_pages', '$rootScope', '$state', '$timeout', function ($stateParams, $scope, get_pages, $rootScope, $state, $timeout) {
        function reqPage() {
            get_pages($scope.pageid, function (data) {
                $scope.data = data.Result.data;
                $scope.PagerInfo = data.Result.pager;
                /* {
                                    count: data.Result.data.length, //当前页文章数量
                                    count_total: pager.counts, //所有文章数量
                                    count_per_page: 10, //每页显示文章数量
                                    pagecount: pager.pagecount, //所有页数
                                    curPage: $scope.pageid //当前页
                                }; */
                $rootScope.$state.current.title = '首页';
                $timeout(function () {
                    angular.element('.read-more').remove();
                });
            });
        }
        $scope.pageid = ($stateParams.pageid && $stateParams.pageid >= 1) ? $stateParams.pageid : 1;
        $scope.jumpToPage = function () {
            $scope.data = {}; //发起请求前清空数据
            reqPage();
        };
        reqPage();

    }]);
