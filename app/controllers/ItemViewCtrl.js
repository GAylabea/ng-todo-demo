// the routeParams allows you to go to the html and pull out whatever you need
app.controller("ItemViewCtrl", function($scope, $routeParams, itemStorage) {
  $scope.items = []; 
  $scope.selectedItem = {};
  // console.log($routeParams.itemId); 

  itemStorage.getItemList().then(function(itemCollection){
    console.log("itemCollection from Promise", itemCollection);
    $scope.items = itemCollection;

// .filter is an array method and will return an array - we want to look thru all the id's and return to the user
// only the ones that matches the id to the routeParam ID (the selected item)
    $scope.selectedItem = $scope.items.filter(function(item){
      return item.id === $routeParams.itemId;
              })[0];
        })
    });

