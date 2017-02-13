var app = angular.module('amarelaWebApp', [
  'ngRoute', 'ui.router'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/index.html"})
    .when("/album/:albumId", {templateUrl: "partials/songs.html", controller: "AmarElaController"})
    .when("/albums/:type", {templateUrl: "partials/albums.html", controller: "AmarElaController"})
    .when("/ela", {templateUrl: "partials/ela.html", controller: "AmarElaController"})
    .when("/search", {templateUrl: "partials/ela.html", controller: "AmarElaController"})


    .when("/temp", {templateUrl: "partials/temp.html", controller: "Test"})
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

