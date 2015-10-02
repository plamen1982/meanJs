var auth = require('./auth');

module.exports = function(app, passport){
    app.get('/partials/:partialArea/:partialName', function(req, res){
        res.render('../../public/app/' + req.params.partialArea + '/'+ req.params.partialName)
    });

    app.post('/login', auth.login);

    app.get('*',function(req, res){
        res.render('index');
    });

};