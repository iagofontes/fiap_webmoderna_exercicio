module.exports = function(app) {
    var valida = require('./../middlewares/valida');
    var curso = app.controllers.curso;
    app.get('/listaCurso', valida, curso.listaCurso);
    app.get('/selecionarCurso/:idCurso', curso.buscarCurso);
    app.post('/cadastraCurso', valida, curso.cadastraCurso);
    app.post('/removeCurso/:idCurso', valida, curso.removeCurso);
}