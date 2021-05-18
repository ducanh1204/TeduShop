(function (app) {
    app.controller('applicationRoleEditController', applicationRoleEditController);
    applicationRoleEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function applicationRoleEditController($scope, apiService, notificationService, $state, $stateParams) {

        function loadApplicationRoleDetail() {
            apiService.get('api/applicationRole/detail/' + $stateParams.id, null,
                function (result) {
                    $scope.applicationRole = result.data;
                }, function (error) {
                    notificationService.displayError(error.data);
                });
        }
        loadApplicationRoleDetail();
        $scope.UpdateApplicationRole = UpdateApplicationRole;
        function UpdateApplicationRole() {
            apiService.put('api/applicationRole/update', $scope.applicationRole,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('application_roles');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
    }
})(angular.module('tedushop.application_roles'))