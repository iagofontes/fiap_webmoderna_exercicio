module.exports = function(app) {

    var curso = app.models.curso;

    var CursoController = {
        cadastraCurso: function(req, res) {
            var message = '';
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
                var message = '';
                if (erro) {
                    console.log(erro);
                    message = 'Problemas ao buscar cursos.';
                }
                res.render('curso/lista-curso', {cursos:cursos,errorMessage:message});
            });
        }
    }

    return CursoController;

}