(function (app) {
    app.controller('applicationGroupAddController', applicationGroupAddController);

    applicationGroupAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];

    function applicationGroupAddController(apiService, $scope, notificationService, $state) {
        $scope.applicationGroup = {
            ID: 0,
            Roles: []
        }

        $scope.AddApplicationGroup = AddApplicationGroup;
        function AddApplicationGroup() {
            apiService.post('api/applicationgroup/create', $scope.applicationGroup,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    $state.go('application_groups');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }

        function loadRoles() {
            apiService.get('/api/applicationRole/getlistall',
                null,
                function (response) {
                    $scope.roles = response.data;
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách quyền.');
                });

        }

        loadRoles();
    }
})(angular.module('tedushop.application_groups'));