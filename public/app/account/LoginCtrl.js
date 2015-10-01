app.controller('LoginCtrl', function($scope, identity, auth, notifier){
  $scope.identity = identity;
    $scope.login =  function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success("Successful login")
            } else {
                notifier.error("Username/Password combination is not valid")
            }
        })
    }
});