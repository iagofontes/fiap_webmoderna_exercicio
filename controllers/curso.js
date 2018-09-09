module.exports = function(app) {

    var curso = app.models.curso;

    var CursoController = {
        cadastraCurso: function(req, res) {
            var message = 'teste';
            if (
            (req.body.curso.codigo.trim().length == 0) || 
            (req.body.curso.descricao.trim().length == 0) || 
            (req.body.curso.carga.trim().length == 0) ||
            (req.body.curso.categoria.trim().length == 0)) {
                message='Dados inválidos.';
            } else {
                var course = req.body.curso;
                curso.create(course, function (erro, course) {
                    if (erro) {
                        console.log(erro);
                        message='Problemas ao adicionar curso.';
                    }
                });
            }
            res.render('/listaCurso', {errorMessage:message});
        },
        listaCurso: function(req, res) {
            curso.find(function (erro, cursos) {
                if (erro) {
                    res.render('/home');
                } else {
                    res.render('curso/lista-curso', {cursos:cursos});
                }
            });
        }
    }

    return CursoController;

}