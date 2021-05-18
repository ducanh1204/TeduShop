(function (app) {
    app.controller('applicationGroupEditController', applicationGroupEditController);
    applicationGroupEditController.$inject = ['$scope', 'apiService','notificationService','$state','$stateParams'];
    function applicationGroupEditController($scope, apiService, notificationService, $state, $stateParams) {

        function loadRoles() {
            apiService.get('/api/applicationRole/getlistall',
                null,
                function (response) {
                    $scope.roles = response.data;
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách quyền.');
                });

        }


        function loadApplicationGroupDetail() {
            apiService.get('api/applicationGroup/detail/' + $stateParams.id, null,
                function (result) {
                    $scope.applicationGroup = result.data;
                }, function (error) {
                    notificationService.displayError(error.data);
                });
        }
        loadApplicationGroupDetail();
        loadRoles();

        $scope.UpdateApplicationGroup = UpdateApplicationGroup;
        function UpdateApplicationGroup() {
            apiService.put('api/applicationGroup/update', $scope.applicationGroup,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('application_groups');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
    }
})(angular.module('tedushop.application_groups'))