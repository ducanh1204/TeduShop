(function (app) {
    app.controller('applicationUserEditController', applicationUserEditController);
    applicationUserEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function applicationUserEditController($scope, apiService, notificationService, $state, $stateParams) {

        function loadApplicationUserDetail() {
            apiService.get('api/applicationUser/detail/' + $stateParams.id, null,
                function (result) {
                    $scope.account = result.data;
                }, function (error) {
                    notificationService.displayError(error.data);
                });
        }
        loadApplicationUserDetail();

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

        $scope.UpdateApplicationUser = UpdateApplicationUser;
        function UpdateApplicationUser() {
            apiService.put('api/applicationUser/update', $scope.account,
                function (result) {
                    notificationService.displaySuccess(result.data.UserName + ' đã được cập nhật.');
                    $state.go('application_users');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
    }
})(angular.module('tedushop.application_users'))