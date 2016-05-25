app.controller("NavCtrl", function($scope){
  $scope.navItems = [
  {
    name: "Logout", 
    url: "#/logout"
    }, 
    {
    name: "All Item",
    url: "#/items/list"
  }, 
  {
    name: "New Item", 
    url: "#/items/new"
  }
  ];
});

