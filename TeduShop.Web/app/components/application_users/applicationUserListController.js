(function (app) {
    app.controller('applicationUserListController', applicationUserListController);

    applicationUserListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function applicationUserListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.applicationUsers = [];
        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.getApplicationUsers = getApplicationUsers;
        $scope.keyword = '';
        $scope.search = search;
        $scope.deleteApplicationUser = deleteApplicationUser;
        $scope.pageSizes = [
            { value: 1 },
            { value: 5 },
            { value: 10 },
            { value: 15 },
        ];
        $scope.pageSize = $scope.pageSizes[0].value;

        function search() {
            getApplicationUsers();
        }
        function getApplicationUsers(page) {
            page = page || 0;
            var config = {
                params: {
                    filter: $scope.keyword,
                    page: page,
                    pageSize: $scope.pageSize
                }
            }
            apiService.get('/api/applicationuser/getlistpaging', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('Không có bản ghi nào được tìm thấy.');
                }
                $scope.applicationUsers = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                console.log('Load applicationuser failed.');
            });
        }
        getApplicationUsers();

        function deleteApplicationUser(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/applicationuser/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }

        $scope.$watch("applicationUsers", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $('#btnDelete').removeAttr('disabled');
            } else {
                $('#btnDelete').attr('disabled', 'disabled');
            }
        }, true);

    }
})(angular.module('tedushop.application_users'));