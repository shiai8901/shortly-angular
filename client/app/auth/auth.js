// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.usernameErrorMessage = '';
  $scope.passwordErrorMessage = '';
  $scope.errorMessage = '';
  $scope.signinErrorMessage = '';

  
  $scope.validateUsername = function() {
    $scope.usernameErrorMessage = '';
    console.log('before', $scope.usernameErrorMessage);

    if ($scope.user.username.length < 8) {
      $scope.usernameErrorMessage += 'user name should have at least 8 charactors. ';
    }     
    console.log('after3', $scope.usernameErrorMessage);
    if ($scope.usernameErrorMessage.length > 0) {
      return false;
    } else {     
      return true;
    }
  };
  
  $scope.validatePassword = function() {
    $scope.passwordErrorMessage = '';
    console.log('before', $scope.passwordErrorMessage);

    if ($scope.user.password === $scope.user.password.toUpperCase()) {
      $scope.passwordErrorMessage += 'password should have at least one uppercase letter. ';
    }
    if ($scope.user.password === $scope.user.password.toLowerCase()) {
      $scope.passwordErrorMessage += 'password should have at least one lower letter. ';
    }
    if ($scope.user.password.length < 8) {
      $scope.passwordErrorMessage += 'password should have at least 8 charactors. ';
    }     
    console.log('after3', $scope.passwordErrorMessage);
    if ($scope.passwordErrorMessage.length > 0) {
      return false;
    } else {    
      return true;
    }
  };

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
        $scope.signinErrorMessage = 'User name or password does not match record.';
      });
  };

  $scope.signup = function () {
    if ($scope.validateUsername() && $scope.validatePassword()) { 
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.shortly', token);
          $location.path('/links');
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      $scope.errorMessage = 'User name or password does not match requirements.'
    }    
  };

  $scope.signout = function() {
    Auth.signout();
  };


});