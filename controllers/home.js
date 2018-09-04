module.exports = function (app) {
    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        home: function(req, res) {
            res.render('home/home');
        },
        login: function(req, res) {
            var email = req.body.user.email;
            var password = req.body.user.password;
            if(email == 'admin' && password == 'admin') {
                var user = req.body.user;
                req.session.user = user;
                res.redirect('/home');
            } else {
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
