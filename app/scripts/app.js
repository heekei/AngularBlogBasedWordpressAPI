'use strict';
angular.module('blogOnAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'treeControl',
    'ui.bootstrap',
    'angular-loading-bar',
    'PostPageModule',
    'PagesModule',
    'categoriesModule',
    'aboutModule',
    'linksModule'
])
    /*博客配置信息*/
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.siteConfig = {
                title: 'Heekei\'s Blog',
                description: '庄希琦的博客'
            };
            $rootScope.API = {
                get_post: '/api/Article/',
                get_posts: '/api/Article/',
                get_category_posts: '/api/get_category_posts/'
            };
        }
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>';
        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $urlRouterProvider
            .when('', '/')
            .when('/post', '/')
            .otherwise('/NotFound');
        $stateProvider
            /*首页*/
            .state('home', {
                url: '/',
                title: '首页',
                controller: ['$state', function ($state) {
                    $state.go('page', {
                        pageid: 1
                    }, {
                        location: false
                    });
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
                url: '/post/{pid}',
                templateUrl: 'views/post_tpl.html',
                controller: 'postView'
            })
            /*404页面*/
            .state('NotFound', {
                url: '/NotFound',
                templateUrl: '404.html'
            });
    }])
    .directive('navbarDir', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/navbar_tpl.html',
            controller: function ($scope) {
                $scope.treeOptions = {
                    nodeChildren: 'children',
                    dirSelectable: true,
                    injectClasses: {
                        ul: 'a1',
                        li: 'a2',
                        liSelected: 'a7',
                        iExpanded: 'a3',
                        iCollapsed: 'a4',
                        iLeaf: 'a5',
                        label: 'a6',
                        labelSelected: 'a8'
                    }
                };
                $scope.dataForTheTree = [{
                    'name': 'Joe',
                    'age': '21',
                    'children': [{
                        'name': 'Smith',
                        'age': '42',
                        'children': []
                    },
                    {
                        'name': 'Gary',
                        'age': '21',
                        'children': [{
                            'name': 'Jenifer',
                            'age': '23',
                            'children': [{
                                'name': 'Dani',
                                'age': '32',
                                'children': []
                            },
                            {
                                'name': 'Max',
                                'age': '34',
                                'children': []
                            }
                            ]
                        }]
                    }
                    ]
                },
                {
                    'name': 'Albert',
                    'age': '33',
                    'children': []
                },
                {
                    'name': 'Ron',
                    'age': '29',
                    'children': []
                }
                ];
            }
        };
    })
    .directive('footerDir', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/footer_tpl.html'
        };
    })

;
