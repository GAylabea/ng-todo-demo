app.controller("ItemListCtrl", function($scope, $http, $location, itemStorage) {
    $scope.items = []; 
// this is being called immediately - w/in the controller - it will call all the stuff from Firebase and make it ava to the DOM
// we are saving time and space by doing this factory just once - remember itemStorage? we are passing it thru above
// / - so no getter is needed (note the old jquery code below)
    itemStorage.getItemList().then(function(itemCollection){
      console.log("itemCollection from Promise", itemCollection);
      $scope.items = itemCollection;
    })

// this one is being called by a button IN the html - so, it needs the $scope so it can be accessible to html. this is how 
// we do event handling (it's attached to the delete button in the html file
  // also, whenever you can attach a .then - response is success of info loading
      $scope.itemDelete = function(itemId){
        console.log("itemId", itemId);
        itemStorage.deleteItem(itemId).then(function(response){
          itemStorage.getItemList().then(function(itemCollection){
            $scope.items = itemCollection;
          })
        })
      }
  });


    // this is a GET request - similar to Ajax - note that we are connecting stuff from the index file which is at the root - 
    // so we don't need two dots to go all the way into another directory. 
    // Also - we are using similar syntax - get post push; here we are using "get"
    // var getItems = function() {
    // $http.get("https://todolistnss.firebaseio.com/items.json")
    //   .success(function(itemObject) {
    //     var itemCollection = itemObject;
    //     console.log("ItemObject", itemCollection);
    //     // we are using the object and keys method here. for everything in the loop, we call it "item" 
    //     // as it goes thru the loop which is an array of ALL the keys of the object, and each key
    //     Object.keys(itemCollection).forEach(function(key){
    //       // this says find the itemCollection object and grab the key I want and set the ID to key - it's basically giving it a firebase ID
    //       itemCollection[key].id=key;
    //       // then we push up the item - we're pushing an object into an items array
    //       $scope.items.push(itemCollection[key]);
    //     })
    //   });
    // }
    // getItems(); 
