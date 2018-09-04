module.exports = function(app) {

    var curso = app.controllers.curso;
    app.get('/cadastraCurso', curso.cadastraCurso);
    app.get('/listaCurso', curso.listaCurso);
}