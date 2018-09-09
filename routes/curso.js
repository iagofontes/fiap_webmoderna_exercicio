module.exports = function(app) {
    var valida = require('./../middlewares/valida');
    var curso = app.controllers.curso;
    app.post('/cadastraCurso', valida, curso.cadastraCurso);
    app.get('/listaCurso', valida, curso.listaCurso);
}