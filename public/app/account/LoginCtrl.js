app.controller('LoginCtrl', function($scope, $http, notifier){
  $scope.login =  function(user){
        $http.post('/login', user).then(function(data){
            if(data.success){
            	notifier.success('Successful login')
            } else{
            	notifier.error('Username/Password combination is not valid')
            }
        })
    }
});