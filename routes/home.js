module.exports = function (app) {
    var home = app.controllers.home;
    app.get('/', home.index);
    app.get('/home', home.home);
    app.post('/login', home.login);
    app.post('/logout', home.logout);
}; 
