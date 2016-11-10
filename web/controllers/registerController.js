angular.module('file_reprocessing_app').controller('registerController', registerController);

function registerController($scope, $http) {

    $scope.addUserDetails = function () {
         $http.post('/add_new_user', $scope.userRegister).success(function (response) {

         });
        
    };
}