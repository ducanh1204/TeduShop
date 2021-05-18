(function (app) {
    app.factory('notificationService', notificationService);

    function notificationService() {
        //toastr.options = {
        //    "debug": false,
        //    "positionClass": "toast-top-right",
        //    "onclick": null,
        //    "fadeIn": 300,
        //    "fadeIn": 1000,
        //    "timeOut": 3000,
        //    "extendedTimeOut": 1000
        //};

        function displaySuccess(message) {
            iziToast.success({
                title: '',
                message: message,
                position: 'topRight'
            });
        }
        function displayError(error) {
            if (Array.isArray(error)) {
                error.each(function (err) {
                    iziToast.error({
                        title: '',
                        message: err,
                        position: 'topRight'
                    });
                });
            }
            else {
                iziToast.error({
                    title: '',
                    message: error,
                    position: 'topRight'
                });
            }
        }

        function displayWarning(message) {
            iziToast.warning({
                title: '',
                message: message,
                position: 'topRight'
            }); 
        }
        function displayInfo(message) {
            iziToast.info({
                title: '',
                message: message,
                position: 'topRight'
            });
        }
        return {
            displaySuccess: displaySuccess,
            displayError: displayError,
            displayWarning: displayWarning,
            displayInfo: displayInfo
        }
    }
})(angular.module('tedushop.common'));