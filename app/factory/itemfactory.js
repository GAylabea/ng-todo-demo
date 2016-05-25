// This is the item factory and will be the only thing in the app that talks to Firebase - this will be used multiple times
// the $q activates the promises - we use a promise because we want JS to keep working - even before the info is available to it
// we can call this in any controller - they will have access by the words "itemStorage" passed in - since they are returned
// at the bottom - also, it is named .factory (an angular thing)
'use strict';
app.factory("itemStorage", function($q, $http) {

    var getItemList = function() {
        var items = [];
        return $q(function(resolve, reject) {
            $http.get("https://todolistnss.firebaseio.com/items.json")
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
    var deleteItem = function(itemId) {
        return $q(function(resolve, reject) {
            $http
                .delete(`https://todolistnss.firebaseio.com/items/${itemId}.json`)
                .success(function(objectFromFirebase) {
                    resolve(objectFromFirebase)
                })
        })
}

var postNewItem = function(newItem) {
    return $q(function(resolve, reject) {
        $http.post(
                "https://todolistnss.firebaseio.com/items/.json",
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
                }
            );
    });
}

return {getItemList: getItemList, deleteItem: deleteItem, postNewItem: postNewItem}

})
