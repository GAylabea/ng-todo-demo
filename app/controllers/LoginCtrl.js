"use strict";
app.controller("LoginCtrl", function($scope, $location, firebaseURL, AuthFactory) {
    let ref = new Firebase(firebaseURL);

    // $scope.hasUser = false;

    $scope.account = {
      email: "",
      password: ""
    };

    if($location.path() === "/logout") {
      // another Firebase method - unauth which kills authorize
      ref.unauth();
    }

    $scope.register = () => {
        console.log("you clicked register");
        ref.createUser({
          email: $scope.account.email,
          password: $scope.account.password
          // this is an anomymous function that passes two things - an error and resolution
        }, (error, userData) => {
          if(error) {
            console.log(`error creating user in register: ${error}`)
          } else{
            // on success, a new user id is created for the user - we also automatically log the user in
            console.log(`created user account with uid: ${userData.uid}`)
            $scope.login(); 
          }
        });
    }; 

    $scope.login = () => {
      console.log("you clicked login");
      // we can use this because we passed it thru at the top
      AuthFactory
      .authenticate($scope.account)
      .then(()=> {
        // $scope.hasUser = true;
        $location.path("/");
        // apply means you just add this in jquery because it makes things work - don't ask! this is the angular version=$apply
        $scope.$apply();
      })
    };
})