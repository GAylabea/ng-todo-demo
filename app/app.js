// we are adding the angular app - and in the parens, are the name of the app and empty brackets
// also, on the lines with when(items/:ect) you can add anything with the colon
"use strict";
var app = angular.module("TodoApp", ["ngRoute"])
    .constant("firebaseURL", "https://todolistnss.firebaseio.com/");

// this function will be available whenever we want - also our html so we will put it in app instead of a LoginCtrl
// it is a method to make sure the user is authenticated - remember authFactory is the AuthFactory js
let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
    if(AuthFactory.isAuthenticated()) {
        console.log("user is authenticated, resolve route promise");
        resolve();
    } else {
        console.log("user is NOT authenticated, reject route promise");
        reject();
    }
})


// each of these within the config is an IIFE - it is NOT global BUT the whole app.config is 
// and sets the stage for everything working togther. 
app.config(function($routeProvider) {
    $routeProvider.
    // we changed these to / because, we did. 
        when("/", {
            templateUrl: "partials/item-list.html",
            controller: "ItemListCtrl",
            // we are adding this resolve to make sure no one who is not athorized visits that page
            resolve: {isAuth}
        }).
         when("/items/list",{
            templateUrl: "partials/item-list.html",
            controller: "ItemListCtrl",
            resolve: {isAuth}
        }).
        when("/items/new", {
            templateUrl: "partials/item-new.html",
            controller: "ItemNewCtrl",
            resolve: {isAuth}
        }).
        when("/items/:itemId", {
            templateUrl: "partials/item-details.html",
            controller: "ItemViewCtrl",
            resolve: {isAuth}
        }).
        when("/items/:itemId/edit", {
            templateUrl: "partials/item-new.html",
            controller: "ItemEditCtrl",
            resolve: {isAuth}
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).
        when("/logout", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).
        otherwise("/");
});

// we are using es6, remember - we are basically writing the same thing as the app.config but this will only run ONCE
app.run( ($location) =>{
    let todoRef = new Firebase("https://todolistnss.firebaseio.com/");

// onAuth is a Firebase method
    todoRef.onAuth(authData =>{
        // if you aren't an authorized user, you are sent back to login
        if(!authData) {
            $location.path("/login");
        }
    })
})
