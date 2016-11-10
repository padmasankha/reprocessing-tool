(function () {
    'use strict';

    angular.module('file_reprocessing_app').controller('loginController', loginController);

    function loginController($scope, $http, $location, $rootScope) {

        $scope.loginUser = function () {

            var email = $scope.username;
            var password = $scope.password

            $http.get('/find_user_by_email/' + email).success(function (response) {
                if (response.length == 0) {
                    alert("User not registerd");
                } else {
                    if (response[0].password == password) {
                        $rootScope.globals = {
                            currentUser: {
                                username: email,
                                password: password
                            }
                        };

                        $location.path('/home');
                    } else {
                        alert("Invalid username or password");
                    }
                }
            });
        };
    }

})();