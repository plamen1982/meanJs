app.factory('identity', function($window){
    console.log($window.bootstrappedUserObject);
    var currentUser;
    return {
        currentUser: $window.bootstrappedUserObject,
        isAuthenticated: function(){
            return !!this.currentUser
        }
    }
});