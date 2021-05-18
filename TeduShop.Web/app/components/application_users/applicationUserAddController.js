(function (app) {
    app.controller('applicationUserAddController', applicationUserAddController);
    applicationUserAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];
    function applicationUserAddController(apiService, $scope, notificationService, $state) {
        $scope.account = {
            Groups: []
        }

        $scope.AddApplicationUser = AddApplicationUser;
        function AddApplicationUser() {
            apiService.post('api/applicationUser/create', $scope.account,
                function (result) {
                    notificationService.displaySuccess(result.data.UserName + ' đã được thêm mới.');
                    $state.go('application_users');
                }, function (error) {
                    notificationService.displayError(error.data.Message);
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }


        function loadGroups() {
            apiService.get('/api/applicationGroup/getlistall',
                null,
                function (response) {
                    $scope.groups = response.data;
                }, function () {
                    notificationService.displayError('Không tải được danh sách nhóm.');
                });

        }
        loadGroups();

    }
})(angular.module('tedushop.application_users'));