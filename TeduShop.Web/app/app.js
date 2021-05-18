﻿/// <reference path="../node_modules/angular/angular.js" />

(function () {
    angular.module('tedushop', [
        'tedushop.products',
        'tedushop.product_categories',
        'tedushop.application_groups',
        'tedushop.application_roles',
        'tedushop.application_users',
        'tedushop.common'
    ]).config(config)
        .config(configAuthentication);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('base', {
            url: "",
            templateUrl: "/app/shared/views/baseView.html",
            abstract:true
        }).state('login', {
            url: "/login",
            templateUrl: "/app/components/login/loginView.html",
            controller: "loginController"
        }).state('home', {
            url: "/home",
            parent:'base',
            templateUrl: "/app/components/home/homeView.html",
            controller: "homeController"
        });
        $urlRouterProvider.otherwise('/login');
    }

    function configAuthentication($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location) {
            if ($location.path() == '') {
                console.log($location.path());
                $location.path('/login');
            }
            return {
                request: function (config) {
                    return config;
                },
                requestError: function (rejection) {
                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (response.status == "401") {
                        $location.path('/login');
                    }
                    return response;
                },
                responseError: function (rejection) {
                    if (rejection.status == "401") {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }
})();
