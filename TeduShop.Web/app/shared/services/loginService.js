(function (app) {
    'use strict';
    app.service('loginService', ['$http', '$q', 'authenticationService', 'authData', 'notificationService', '$injector',
        function ($http, $q, authenticationService, authData, notificationService, $injector) {
            var userInfo;
            var deferred;

            this.login = function (userName, password) {
                $('.loader').fadeIn(100);
                deferred = $q.defer();
                var config = {
                    userName: userName,
                    password: password,
                    grant_type: 'password'
                }

                $http.post('/api/timeattendency/account/login', config, {
                    headers:
                        { 'Content-Type': 'application/json' }
                }).then(function (response) {
                    userInfo = {
                        accessToken: response.data,
                        userName: userName
                    };
                    authenticationService.setTokenInfo(userInfo);
                    authData.authenticationData.IsAuthenticated = true;
                    authData.authenticationData.userName = userName;
                    authData.authenticationData.accessToken = userInfo.accessToken;
                    var stateService = $injector.get('$state');
                    //notificationService.displaySuccess("Xin chào " + userName);
                    stateService.go('home');
                    deferred.resolve(null);
                    $('.loader').fadeOut(100);
                }, function (err) {
                    //console.log(err);
                    $('.loader').fadeOut(100);
                    notificationService.displayError("Tên tài khoản hoặc mật khẩu không đúng!");
                })
                    .then(function (err, status) {
                        authData.authenticationData.IsAuthenticated = false;
                        authData.authenticationData.userName = "";
                        deferred.resolve(err);
                        $('.loader').fadeOut(100);
                    });
                return deferred.promise;
            }

            this.logOut = function () {
                authenticationService.removeToken();
                authData.authenticationData.accessToken = "";
                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.userName = "";
            }
        }]);
})(angular.module('tedushop.common'));