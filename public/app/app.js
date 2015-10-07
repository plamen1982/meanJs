var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(
   function($routeProvider) {
       var routeUserChecks = {
           adminRole: {
               authenticate: function(auth) {
                   return auth.isAuthorizedForRole('admin');
               }
           },
           authenticated: {
               authenticate: function(auth) {
                   return auth.isAuthenticated();
               }
           }
       };
       $routeProvider
           .when('/', {
               templateUrl:'/partials/main/home',
               controller:'MainCtrl'
           })
           .when('/courses',{
               templateUrl:'/partials/main/courses',
               controller:'MainCtrl'
           })
           .when('/admin/users', {
               templateUrl: '/partials/admin/users-list',
               controller: 'UserListCtrl',
               resolve: routeUserChecks.adminRole

           })
   });

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})