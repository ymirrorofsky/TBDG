angular.module('starter.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: 'true',
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.home', {
                url: '/home',
                cache: false,
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab/tab-home.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            .state('tab.my', {
                url: '/my',
                cache: false,
                views: {
                    'tab-my': {
                        templateUrl: 'templates/tab/tab-my.html',
                        controller: 'myCtrl'
                    }
                }
            })
            .state('auth', {
                url: '/auth',
                abstract: 'true',
                template: '<ion-nav-view></ion-nav-view>'
            })
            .state('auth.login', {
                url: '/login',
                cache: false,
                templateUrl: 'templates/auth/login.html',
                controller: 'loginCtrl'
            })
            .state('auth.register', {
                url: '/register',
                cache: false,
                templateUrl: 'templates/auth/register.html',
                controller: 'registerCtrl'
            })
            .state('user', {
                url: '/user',
                abstract: 'true',
                template: '<ion-nav-view></ion-nav-view>'
            })
            .state('user.goodInfo', {
                url: '/goodInfo/:role',
                cache: false,
                param: { role: null },
                templateUrl: 'templates/user/goodInfo.html',
                controller: 'goodInfoCtrl'
            })
            .state('user.createOrder', {
                url: '/createOrder',
                cache: false,
                templateUrl: 'templates/user/createOrder.html',
                controller: 'createOrderCtrl'
            })
            .state('user.pay', {
                url: '/pay',
                cache: false,
                // params: { orderId: null, spid: null, payPrice: null },
                templateUrl: 'templates/user/pay.html',
                controller: 'userPayCtrl'
            })




        $urlRouterProvider.otherwise('/auth/login');

    })