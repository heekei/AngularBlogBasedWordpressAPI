'use strict';

/**
 * @ngdoc overview
 * @name blogOnAngularJsApp
 * @description
 * # blogOnAngularJsApp
 *
 * Main module of the application.
 */
angular
    .module('blogOnAngularJsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'PostPageModule',
        'PagesModule',
        'CategoriesModule',
        "treeControl",
        "ui.bootstrap",
        'angular-loading-bar'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>';
        $urlRouterProvider
            .when("", "/")
            .when("/", "/page/1")
            .when("/post", "/page/1")
            .otherwise("/NotFound");
        $stateProvider
            .state('/', {
                url: '/',
                controller: function ($state) {
                    console.log($state);
                    $state.href("page.id", { id: 1 }, { location: "/", relative: false });
                }
            })
            /*分类页面*/
            .state('category', {
                url: '/category/{cid}/{pageid}',
                templateUrl: 'views/pages.html',
                controller: 'CategoriesController'
            })
            // .state('category.page',{
            //     url:'/category/{id}/{pageid}',
            //     templateUrl: 'views/pages.html',
            //     controller:'CategoriesController'
            // })
            /*文章列表*/
            .state('page', {
                url: '/page/{pageid}',
                templateUrl: 'views/pages.html',
                controller: 'PagesController'
            })
            /*文章页*/
            .state('post', {
                url: "/post/{pid}",
                templateUrl: 'views/post_tpl.html',
                controller: 'postView'
            })
            ;
    }])
    .directive('getPosts', ['$http', '$sce', function ($http, $sce) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/get_posts_tpl.html',
            compile: function () {
                return function (scope, elm, attr) {
                    console.log(attr.$attr["page-num"]);
                    $http({
                        // url: 'http://heekei.cn/api/get_posts/?count=100',
                        url: 'http://heekei.cn/wp-json/wp/v2/posts?page=' + (attr.$attr["page-num"] ? attr.$attr["page-num"] : 1),
                        method: 'GET',
                        cache: true
                    }).then(function (data) {
                        scope.data = data.data;
                    });
                };
            }
        };
    }])
    .directive('navbarDir', function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/navbar_tpl.html',
            controller: function ($scope) {
                $scope.treeOptions = {
                    nodeChildren: "children",
                    dirSelectable: true,
                    injectClasses: {
                        ul: "a1",
                        li: "a2",
                        liSelected: "a7",
                        iExpanded: "a3",
                        iCollapsed: "a4",
                        iLeaf: "a5",
                        label: "a6",
                        labelSelected: "a8"
                    }
                };
                $scope.dataForTheTree = [
                    {
                        "name": "Joe", "age": "21", "children": [
                            { "name": "Smith", "age": "42", "children": [] },
                            {
                                "name": "Gary", "age": "21", "children": [
                                    {
                                        "name": "Jenifer", "age": "23", "children": [
                                            { "name": "Dani", "age": "32", "children": [] },
                                            { "name": "Max", "age": "34", "children": [] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    { "name": "Albert", "age": "33", "children": [] },
                    { "name": "Ron", "age": "29", "children": [] }
                ];
            }
        };
    })
    .directive('footerDir', function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'views/footer_tpl.html'
        };
    })

    ;
