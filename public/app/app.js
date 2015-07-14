var app = angular.module('app', ['ngResource']);

app.config(
   function($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl:'partials/home',
               controller:'MainCtrl'
           })
   }
);
