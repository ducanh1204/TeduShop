(function (app) {
    app.controller('applicationGroupListController', applicationGroupListController);

    applicationGroupListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function applicationGroupListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.applicationGroups = [];
        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.getApplicationGroups = getApplicationGroups;
        $scope.keyword = '';
        $scope.search = search;
        $scope.selectAll = selectAll;
        $scope.isAll = false;
        $scope.deleteApplicationGroup = deleteApplicationGroup;
        $scope.deleteMultiple = deleteMultiple;
        $scope.pageSizes = [
            { value: 5 },
            { value: 10 },
            { value: 15 },
            { value: 20 },
        ];
        $scope.pageSize = $scope.pageSizes[0].value;

        function search() {
            getApplicationGroups();
        }
        function getApplicationGroups(page) {
            page = page || 0;
            var config = {
                params: {
                    filter: $scope.keyword,
                    page: page,
                    pageSize: $scope.pageSize
                }
            }
            apiService.get('/api/applicationgroup/getlistpaging', config, function (result) {
                if (result.data.TotalCount == 0) {
                }
                $scope.applicationGroups = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                console.log('Load applicationgroup failed.');
            });
        }
        getApplicationGroups();

        function deleteApplicationGroup(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/applicationgroup/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                })
            });
        }

        $scope.$watch("applicationGroups", function (n, o) {
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
                angular.forEach($scope.applicationGroups, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.applicationGroups, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }
        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            })
            var config = {
                params: {
                    listItemID: JSON.stringify(listId)
                }
            }
            apiService.del('api/applicationgroup/deletemulti', config, function (result) {
                notificationService.displaySuccess('Xóa thành công ' + result.data + ' bản ghi');
                search();
            }, function (error) {
                notificationService.displayError('Xóa không thành công');
            });
        }
    }
})(angular.module('tedushop.application_groups'));