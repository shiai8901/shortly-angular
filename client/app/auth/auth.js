// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.errorMessage = '';
  $scope.usernameErrorMessage = [];
  $scope.passwordErrorMessage = [];

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.validate($scope.user, function(valid) {
      if (valid) {        
        Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.shortly', token);
          $location.path('/links');
        })
        .catch(function (error) {
          console.error(error);
        });
      }
    })
  };

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.validate = function() {

    if (!/^[A-Z-]*$/.test($scope.user.username)) {
      $scope.usernameErrorMessage.push('user name should have at least one uppercase letter');
    };
    if (!/^[a-z-]*$/.test($scope.user.username)) {
      $scope.usernameErrorMessage.push('user name should have at least one lowercase letter');
    };
    if (!/^[0-9-]*$/.test($scope.user.username)) {
      $scope.usernameErrorMessage.push('user name should have at least one number');
    };    
  }
});