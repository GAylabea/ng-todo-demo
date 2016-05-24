// this defines our keys - in case it's left blank, 
app.controller("ItemNewCtrl", function($scope, $http, $location) {
  $scope.newTask = {
    assigedTo: "",
    dependencies: "",
    dueDate: "",
    isCompleted: false,
    location: "",
    task: "",
    urgency: ""
  };

// we are creating parameters for the new object to load - we are pulling all the info from the form
$scope.addNewItem = function() {
  $http.post(
    "https://todolistnss.firebaseio.com/items.json", 
    JSON.stringify({
      assigedTo: $scope.newTask.assigedTo,
      dependencies: $scope.newTask.dependencies,
      dueDate: $scope.newTask.dueDate,
      isCompleted: false,
      location: $scope.newTask.location,
      task: $scope.newTask.task,
      urgency: $scope.newTask.urgency
    })
    )
  .success(function(response) {
    console.log(response); 
    // this $location allows us to change the URL window - we could have used any other view - details, new, etc. 
    // - it needs to be directed to something that is actually in your app
    $location.url("/items/list")
  })

  // $scope.newTask.isCompleted = false; - this is now in the object
  // $scope.newTask.id = $scope.items.length; - this line kept track of our objects but firebase does that now so...
  // console.log("you added new item", $scope.newTask); 
  // $scope.items.push($scope.newTask); - this was pushing to the old array but we changed it to objects 
  // $scope.newTask = ""; - this was saving to a new string
  }
});
