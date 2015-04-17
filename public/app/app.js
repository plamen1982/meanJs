var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(
   function($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl:'partials/home',
               controller:'MainCtrl'
           })
   }
);
