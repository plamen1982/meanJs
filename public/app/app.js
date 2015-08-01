var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(
   function($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl:'/partials/main/home',
               controller:'MainCtrl'
           })
           .when('/courses',{
               templateUrl:'/partials/main/courses',
               controller:'MainCtrl'
           })
   });

