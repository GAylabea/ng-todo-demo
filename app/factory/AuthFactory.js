"use strict";
app.factory("AuthFactory", function(firebaseURL) {
  // when you're using Firebase, you must have this line - it allows us all the Firebase methods:
  let ref = new Firebase(firebaseURL);
  // when the page loads, you don't want info there so set it to null
  let currentUserData = null;

  return {
    /*
      Determine if the client is authenticated - .getAuth is a Firebase method, SO it returns if they exist or not with the ? -
       it's checking the Firebase login area to see if they are real
      */
      isAuthenticated () {
        let authData = ref.getAuth();
        return (authData) ? true : false;
      },
      // the getUser, returns null until the user log ins and will overwrite the login null - this will be the "check function" 
      // to make sure the user IS logged in
      // we will also call getUser in the itemFactory
      getUser () {
        return currentUserData;
      },

    /*
      Authenticate the client via Firebase
      */
      // we call authWithPassword and send thru email and password
      authenticate (credentials) {
        return new Promise((resolve, reject) => {
          // authWithPassword is a Firebase method 
          ref.authWithPassword({
            "email": credentials.email,
            "password": credentials.password
            // since this is a Promise, it will either reject or resolve
          }, (error, authData) => {
            if (error) {
              reject(error);
            } else {
              console.log("authWithPassword method completed successfully");
              // this is where we overide/write the function above - the currentUserData
              currentUserData = authData;
              resolve(authData);
            }
          });
        });
      },

    /*
      Store each Firebase user's id in the `users` collection
      */
      storeUser (authData) {
        let stringifiedUser = JSON.stringify({ uid: authData.uid });

        return new Promise((resolve, reject) => {
          $http
          .post(`${firebaseURL}/users.json`, stringifiedUser)
          .then(
            res => resolve(res),
            err => reject(err)
            );
        });
      }
    };
  });