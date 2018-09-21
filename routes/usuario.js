module.exports = function(app) {
    var valida = require('./../middlewares/valida');
    var usuario = app.controllers.usuario;
    app.get('/gerenciaUsuario', valida, usuario.gerenciaUsuario);
    app.post('/adicionarUsuario', valida, usuario.adicionarUsuario);
    app.post('/removerUsuario/:idUsuario', valida, usuario.removerUsuario);
}