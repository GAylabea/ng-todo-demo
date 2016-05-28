// this defines our keys - in case it's left blank, 
app.controller("ItemNewCtrl", function($scope, $location, itemStorage) {
   $scope.title="New Item";
  $scope.submitButtonText = "Add New Item";
  $scope.newTask = {
      assignedTo: "",
      dependencies: "",
      dueDate: "",
      isCompleted: false,
      location: "",
      task: "",
      urgency: ""
  };

// instead of doing the traditional promise, we are quickly using this function to add a new item and post the list to the DOM
// (remember, itemStorage is in the itemListCtrl) - also, notice the $scope.newTask which attaches itself to the html
$scope.addNewItem = function() {
    itemStorage.postNewItem($scope.newTask)
      .then(function successCallback(response){
        console.log(response)
        $location.url("/items/list");
      }); 
    };
  }); 

  // $scope.newTask.isCompleted = false; - this is now in the object
  // $scope.newTask.id = $scope.items.length; - this line kept track of our objects but firebase does that now so...
  // console.log("you added new item", $scope.newTask); 
  // $scope.items.push($scope.newTask); - this was pushing to the old array but we changed it to objects 
  // $scope.newTask = ""; - this was saving to a new string
//   }
// });
