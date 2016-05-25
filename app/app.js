// we are adding the angular app - and in the parens, are the name of the app and empty brackets
// also, on the lines with when(items/:ect) you can add anything with the colon
var app = angular.module("TodoApp", ["ngRoute"]);

// each of these within the config is an IIFE - it is NOT global BUT the whole app.config is 
// and sets the stage for everything working togther. 
app.config(function($routeProvider) {
    $routeProvider.
        when("/items/list",{
            templateUrl: "partials/item-list.html",
            controller: "ItemListCtrl"
        }).
        when("/items/new", {
            templateUrl: "partials/item-new.html",
            controller: "ItemNewCtrl"
        }).
        when("/items/:itemId", {
            templateUrl: "partials/item-details.html",
            controller: "ItemViewCtrl"
        }).
        otherwise("items/list");
});