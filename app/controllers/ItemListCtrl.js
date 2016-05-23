app.controller("ItemListCtrl", function($scope, $http) {
    $scope.items = []; 
    // this is a GET request - similar to Ajax - note that we are connecting stuff from the index file which is at the root - so we don't need two dots
    $http.get("./data/items.json")
      .success(function(itemObject){
        console.log("ItemObject", itemObject);
      })
});
