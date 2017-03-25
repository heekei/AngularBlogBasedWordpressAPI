'use strict';
angular.module('blogOnAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    "treeControl",
    "ui.bootstrap",
    'angular-loading-bar',
    'PostPageModule',
    'PagesModule',
    'CategoriesModule',
    'aboutModule',
    'linksModule'
])
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>';
        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $urlRouterProvider
            .when("", "/")
            .when("/post", "/")
            // .when("/page", "/")
            .otherwise("/NotFound");
        $stateProvider
            .state('home', {
                url: '/',
                title: '首页',
                controller: ['$state', '$rootScope', function ($state, $rootScope) {
                    $state.go("page", {}, { location: false });
                }]
            })
            /*分类页面*/
            .state('category', {
                url: '/category?cid&pageid',
                templateUrl: 'views/pages.html',
                controller: 'CategoriesController'
            })
            /*文章列表*/
            .state('page', {
                url: '/page?pageid',
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
    // .directive('getPosts', ['$http', function ($http) {
    //     return {
    //         restrict: "E",
    //         replace: true,
    //         templateUrl: 'views/get_posts_tpl.html',
    //         compile: function () {
    //             return function (scope, elm, attr) {
    //                 console.log(attr.$attr["page-num"]);
    //                 $http({
    //                     // url: 'http://heekei.cn/api/get_posts/?count=100',
    //                     url: 'http://heekei.cn/wp-json/wp/v2/posts?page=' + (attr.$attr["page-num"] ? attr.$attr["page-num"] : 1),
    //                     method: 'GET',
    //                     cache: true
    //                 }).then(function (data) {
    //                     scope.data = data.data;
    //                 });
    //             };
    //         }
    //     };
    // }])
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
