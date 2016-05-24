app.controller("ItemListCtrl", function($scope, $http) {
    $scope.items = []; 
    // this is a GET request - similar to Ajax - note that we are connecting stuff from the index file which is at the root - 
    // so we don't need two dots to go all the way into another directory. 
    // Also - we are using similar syntax - get post push; here we are using "get"
    $http.get("https://todolistnss.firebaseio.com/items.json")
      .success(function(itemObject){
        var itemCollection = itemObject;
        console.log("ItemObject", itemCollection);
        // we are using the object and keys method here. for everything in the loop, we call it "item" 
        // as it goes thru the loop which is an array of ALL the keys of the object, and each key
        Object.keys(itemCollection).forEach(function(key){
          // this says find the itemCollection object and grab the key I want and set the ID to key - it's basically giving it a firebase ID
          itemCollection[key].id=key;
          // then we push up the item - we're pushing an object into an items array
          $scope.items.push(itemCollection[key]);
        })
      })
});
