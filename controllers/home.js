module.exports = function (app) {
    
    var mongoose = require('mongoose');
    var Usuario = mongoose.model('usuario');

    var HomeController = {
        index: function (req, res) {
            res.render('home/index', {errorMessage:''});
        },
        home: function(req, res) {
            res.render('home/home');
        },
        login: function(req, res) {
            var email = req.body.user.email;
            var password = req.body.user.password;
            if(email == 'admin@admin.com' && password == 'admin') {
                var user = req.body.user;
                req.session.user = user;
                res.redirect('/home');
            } else if(email && password) {
                Usuario
                    .findOne({email:email, senha:password})
                    .select('email senha')
                    .exec(function(error, user){
                        if(error) {
                            console.log(error);
                            res.render('home/index', {errorMessage:'Problemas ao buscar usuários.'});
                        } else {
                            if(user != null && user != undefined) {
                                req.session.usuario = user;
                                res.redirect('/home');
                            } else {
                                // res.redirect('/', {errorMessage:'Usuário ou senha incorretos.'});
                                res.render('home/index', {errorMessage:'Usuário ou senha incorretos.'});
                            }
                        }
                    });
            }else {
                res.redirect('/');
            }
        },
        logout: function(req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
}; 
