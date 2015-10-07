'use strict';

app.controller('MainCtrl', function MainCtrl($scope, cachedCourses){
    $scope.courses = cachedCourses.query();
});