// we are adding the angular app - and in the parens, are the name of the app and empty brackets
var app = angular.module("TodoApp", []); 

app.controller("NavCtrl", function($scope){
  $scope.navItems = [{name: "Logout"}, {name: "All Item"}, {name: "New Item"}]
})

// now a controller - we put the name of the controller (traditionally with Ctrl) and add a function with scope 
  // don't forget to pu the name of the controller inside the index file
app.controller("TodoCtrl", function($scope) {
  $scope.welcome = "hello";
  $scope.showListView = false;
  $scope.newTask = {} ; 

  $scope.items = [
  {
    id: 0,
    task: "mow the lawn",
    isCompleted: true,
    dueDate: "12/5/17",
    assignedTo: "greg",
    location: "Zoe's house",
    urgency: "low",
    dependencies: ["sunshine", "clippers", "hat", "water", "headphones"]
  },
  {
    id: 1,
    task: "grade quizzes",
    isCompleted: false,
    dueDate: "12/5/17",
    assignedTo: "Joe",
    location: "NSS",
    urgency: "high",
    dependencies: ["wifi", "tissue", "vodka"]
  },
  {
    id: 2,
    task: "take a nap",
    isCompleted: false,
    dueDate: "12/5/17",
    assignedTo: "Zoe",
    location: "Zoe's house",
    urgency: "medium",
    dependencies: ["hammock", "cat", "hat", "pillow", "blankey"]
  }
  ]

  $scope.newItem = function(){
    console.log("you clicked new item"); 
    $scope.showListView = false;
  }
  $scope.allItem = function(){
    console.log("you clicked all item");
    $scope.showListView = true;
  }

})