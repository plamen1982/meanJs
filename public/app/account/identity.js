app.factory('identity', function(){
    var currentUser;
    return {
        currentUser : currentUser,
        isAuthenticated: function(){
            return !!this.currentUser
        }
    }
});