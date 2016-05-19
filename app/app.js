// we are adding the angular app - and in the parens, are the name of the app and empty brackets
var app = angular.module("TodoApp", []); 

app.controller("NavCtrl", function($scope){
  $scope.navItems = [{name: "Logout"}, {name: "All Item"}, {name: "New Item"}]
})

// now a controller - we put the name of the controller (traditionally with Ctrl) and add a function with scope 
  // don't forget to pu the name of the controller inside the index file
app.controller("TodoCtrl", function($scope) {
  $scope.welcome = "hello"; 

})