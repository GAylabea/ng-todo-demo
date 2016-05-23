app.controller("ItemNewCtrl", function($scope) {
  $scope.newTask = {};
  $scope.items = []

$scope.addNewItem = function() {
  $scope.newTask.isCompleted = false; 
  $scope.newTask.id = $scope.items.length; 
  console.log("you added new item", $scope.newTask);
  $scope.items.push($scope.newTask);  
  $scope.newTask = ""; 
  }
});
