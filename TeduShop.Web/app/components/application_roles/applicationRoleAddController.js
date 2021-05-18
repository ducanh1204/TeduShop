(function (app) {
    app.controller('applicationRoleAddController', applicationRoleAddController);
    applicationRoleAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function applicationRoleAddController(apiService, $scope, notificationService, $state) {
        $scope.AddApplicationRole = AddApplicationRole;
        function AddApplicationRole() {
            apiService.post('api/applicationRole/create', $scope.applicationRole,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    $state.go('application_roles');
                }, function (error) {
                    notificationService.displayError(error.data.Message);
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
    }
})(angular.module('tedushop.application_roles'));