var app = angular.module('amarelaWebApp', [
  'ngRoute', 'ui.router'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/index.html"})
    .when("/album/:albumId", {templateUrl: "partials/songs.html", controller: "AmarElaController"})
    .when("/albums/:type", {templateUrl: "partials/albums.html", controller: "AmarElaController"})

    // Pages
    .when("/about", {templateUrl: "partials/about.html"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/ela", {templateUrl: "partials/ela.html", controller: "AmarElaController"})
    .when("/temp", {templateUrl: "partials/temp.html", controller: "Test"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

