app.controller('LoginCtrl', function($scope, $http){
  $scope.login =  function(user){
        $http.post('/login', user).success(function(res){
            console.log(res)
        })
    }
});