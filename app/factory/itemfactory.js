// This is the item factory and will be the only thing in the app that talks to Firebase - this will be used multiple times
// the $q activates the promises - we use a promise because we want JS to keep working - even before the info is available to it
// we can call this in any controller - they will have access by the words "itemStorage" passed in - since they are returned
// at the bottom - also, it is named .factory (an angular thing)

app.factory("itemStorage", function($q, $http, firebaseURL) {
    var getItemList = function() {
        var items = [];
        return $q(function(resolve, reject) {
            $http.get(firebaseURL + "items.json")
                .success(function(itemObject) {
                    var itemCollection = itemObject;
                    Object.keys(itemCollection).forEach(function(key) {
                        itemCollection[key].id = key;
                        items.push(itemCollection[key]);
                    })
                    resolve(items);
                })
                .error(function(error) {
                    reject(error);
                });
        })
    }
    // the itemId is from the itemListCtrl and it is also in the item-list.html in itemDelete ng-click (thingy.id) 
    // AND item-list-html with the delete button which has a ng-click called itemId
    var deleteItem = function(itemId) {
        return $q(function(resolve, reject) {
            $http
                .delete(firebaseURL + "items/" + itemId + ".json")
                .success(function(objectFromFirebase) {
                    resolve(objectFromFirebase)
                });
        });
};
// we are passing newItem thru this function  - note how similar all three are. They each call $http, then post, delete or get
var postNewItem = function(newItem) {
    return $q(function(resolve, reject) {
        $http.post(
                firebaseURL + "items.json",
                JSON.stringify({
                    assignedTo: newItem.assignedTo,
                    dependencies: newItem.dependencies,
                    dueDate: newItem.dueDate,
                    isCompleted: newItem.isCompleted,
                    location: newItem.task,
                    task: newItem.task,
                    urgency: newItem.urgency
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
// remember - resolve is a promise-word - it's giving back the data; it says the promise is completed
                }
            );
    });
};
// All three of the methods need to be returned here: 
return {getItemList: getItemList, deleteItem: deleteItem, postNewItem: postNewItem}

});
