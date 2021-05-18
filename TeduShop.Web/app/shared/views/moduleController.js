(function (app) {
    app.controller('moduleController', ['$scope', 'apiService', function ($scope, apiService) {

        getModules();
        function getModules() {
            apiService.get('api/timeattendency/appmodule/getall', null,
                function (response) {
                    $scope.modules = response.data;
                    var arr = response.data;
                    $scope.trees = unflatten(arr);
                });
        }
        unflatten = function (array, parent, tree) {
            tree = typeof tree !== 'undefined' ? tree : [];
            parent = typeof parent !== 'undefined' ? parent : { ID: 0 };
            var children = _.filter(array, function (child) { return child.ParentID == parent.ID; });
            if (!_.isEmpty(children)) {
                if (parent.ID == 0) {
                    tree = children;
                } else {
                    parent['children'] = children
                }
                _.each(children, function (child) { unflatten(array, child) });
            }

            return tree;
        }
        let sidebar_nicescroll_opts = {
            cursoropacitymin: 0,
            cursoropacitymax: 0.8,
            zindex: 892,
        },
            now_layout_class = null;

        var sidebar_nicescroll;
        var update_sidebar_nicescroll = function () {
            let a = setInterval(function () {
                if (sidebar_nicescroll != null)
                    sidebar_nicescroll.resize();
            }, 10);

            setTimeout(function () {
                clearInterval(a);
            }, 600);
        };

        $scope.sidebar_dropdown = function (id) {
            var element = $("#" + id + "");
            if ($(".main-sidebar").length) {
                $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
                sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
                element.parent()
                    .find("> .dropdown-menu")
                    .slideToggle(500, function () {
                        update_sidebar_nicescroll();
                        return false;
                    });
                element.toggleClass("toggled");
                return false;
            }
        };


    }]);

})(angular.module('tedushop.common'));