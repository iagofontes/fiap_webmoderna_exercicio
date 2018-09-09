module.exports = function (app) {

    var valida = require('./../middlewares/valida');
    var home = app.controllers.home;

    app.get('/', home.index);
    app.get('/home', valida, home.home);
    app.post('/login', home.login);
    app.post('/logout', home.logout);
    app.get('/logout', home.logout);
}; 
