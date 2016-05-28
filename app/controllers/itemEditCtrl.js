// this defines our keys - in case it's left blank, 
app.controller("ItemEditCtrl", function($scope, $location, $routeParams, itemStorage) {
  // if you want to post to the DOM, do this:
  $scope.title="Edit Item";
  $scope.submitButtonText = "Update"
  $scope.newTask = {};

  itemStorage.getSingleItem($routeParams.itemId)
    .then(function successCallback(response) {
      $scope.newTask=response; 
    })
// instead of doing the traditional promise, we are quickly using this function to add a new item and post the list to the DOM
// (remember, itemStorage is in the itemListCtrl) - also, notice the $scope.newTask which attaches itself to the html
$scope.addNewItem = function() {
    itemStorage.updateItem($routeParams.itemId, $scope.newTask)
      .then(function successCallback(response){
        // console.log(response)
        $location.url("/items/list");
      }); 
    };
  }); 

