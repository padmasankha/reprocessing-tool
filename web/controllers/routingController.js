var app = angular.module('file_reprocessing_app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            controller: 'loginController',
            templateUrl: '/login.html'
        })
        .when('/forgot-password', {
            templateUrl: '/forgot_password.html'
        })
        .when('/signup', {
            controller: 'registerController',
            templateUrl: '/register.html'
        })
        .when('/home', {
            templateUrl: '/home.html'
        })
        .when('/configuration', {
            templateUrl: '/config.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});