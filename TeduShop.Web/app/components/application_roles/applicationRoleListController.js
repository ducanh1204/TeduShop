(function (app) {
    app.controller('applicationRoleListController', applicationRoleListController);

    applicationRoleListController.$inject = ['$scope', 'apiService', 'notificationService', '$filter', '$ngBootbox'];

    function applicationRoleListController($scope, apiService, notificationService, $filter, $ngBootbox) {
        $scope.applicationRoles = [];
        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.getApplicationRoles = getApplicationRoles;
        $scope.keyword = '';
        $scope.search = search;
        $scope.selectAll = selectAll;
        $scope.isAll = false;
        $scope.deleteApplicationRole = deleteApplicationRole;
        $scope.deleteMultiple = deleteMultiple;
        $scope.pageSizes = [
            { value: 1 },
            { value: 25 },
            { value: 50 },
            { value: 100 },
        ];
        $scope.pageSize = $scope.pageSizes[0].value;


        function search() {
            getApplicationRoles();
        }
        function getApplicationRoles(page) {
            page = page || 0;
            var config = {
                params: {
                    filter: $scope.keyword,
                    page: page,
                    pageSize: $scope.pageSize
                }
            }
            apiService.get('api/applicationRole/getlistpaging', config,
                function (result) {
                    if (result.data.TotalCount == 0) {
                    }
                    $scope.applicationRoles = result.data.Items;
                    $scope.page = result.data.Page;
                    $scope.pagesCount = result.data.TotalPages;
                    $scope.totalCount = result.data.TotalCount;
                }, function () {
                    console.log('Load applicationrole failed.');
                });
        }
        getApplicationRoles();

        function deleteApplicationRole(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/applicationRole/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }

        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.Id);
            })
            var config = {
                params: {
                    checkedList: JSON.stringify(listId)
                }
            }
            apiService.del('api/applicationRole/deletemulti', config, function (result) {
                notificationService.displaySuccess('Xóa thành công ' + result.data + ' bản ghi');
                search();
            }, function (error) {
                notificationService.displayError('Xóa không thành công');
            });
        }

        $scope.$watch("applicationRoles", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $('#btnDelete').removeAttr('disabled');
            } else {
                $('#btnDelete').attr('disabled', 'disabled');
            }
        }, true);

        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.applicationRoles, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.applicationRoles, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }
    }
})(angular.module('tedushop.application_roles'));