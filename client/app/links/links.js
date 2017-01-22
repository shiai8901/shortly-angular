angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};
  // $scope.data.links is an array
  $scope.getAll = function() {
    Links.getAll() 
    .then( function(response) {
    	console.log('response in LinksController,', response);
      $scope.data.links = response;
    });
  };
  $scope.getAll();
  console.log('$scope.data', $scope.data);

  $scope.sort = function() {
    
  }
});
