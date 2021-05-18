
(function (app) {
    app.controller('loginController', ['$scope', 'loginService', "notificationService",
        function ($scope, loginService, notificationService) {
            $scope.loading = false;
            $scope.loginData = {
                userName: "",
                password: ""
            };
            $scope.loginSubmit = function () {
                $scope.loading = true;

                if ($scope.loginData.userName == "") {
                    notificationService.displayError("Tài khoản không được bỏ trống!");
                    $scope.loading = false;
                    return;
                }
                if ($scope.loginData.password == "") {
                    notificationService.displayError("Mật khẩu không được bỏ trống!");
                    $scope.loading = false;
                    return;
                }
                loginService.login($scope.loginData.userName, $scope.loginData.password);
                $scope.loading = false;
            };
        }]);
})(angular.module('tedushop'));