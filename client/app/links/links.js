angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getAll = function() {
    Links.getAll() 
    .then( function(response) {
      $scope.data.links = response;
    });
  };

  $scope.getAll();
});
