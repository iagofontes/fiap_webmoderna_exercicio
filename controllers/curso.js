module.exports = function(app) {

    var curso = app.models.curso;

    var CursoController = {
        cadastraCurso: function(req, res) {
            var message = '';
            var cursos = [];
            if (
            (req.body.curso.codigo.trim().length == 0) || 
            (req.body.curso.descricao.trim().length == 0) || 
            (req.body.curso.carga.trim().length == 0) ||
            (req.body.curso.categoria.trim().length == 0)) {
                message='Dados inválidos.';
                res.render('curso/lista-curso', {cursos:cursos, errorMessage:message});
            } else {
                var course = req.body.curso;
                curso.create(course, function (erro, course) {
                    if (erro) {
                        console.log(erro);
                        message='Problemas ao adicionar curso.';
                    } else {
                        CursoController.buscarCursos(function(response) {
                            if(response.status) {
                                cursos = response.cursos;
                            } else {
                                message = response.message;
                            }
                            res.render('curso/lista-curso', {cursos:cursos, errorMessage:message});
                        });
                    }
                });
            }
        },
        listaCurso: function(req, res) {
            CursoController.buscarCursos(function(response) {
                if(response.status) {
                    res.render('curso/lista-curso', {cursos:response.cursos, errorMessage:''});
                } else {
                    res.render('curso/lista-curso', {cursos:[], errorMessage:response.message});
                }
                return;
            });
        },
        buscarCursos: function(callback) {
            curso.find(function (erro, cursos) {
                if (erro) {
                    console.log(erro);
                    callback({status:false, message:'Problemas ao buscar cursos.'});
                } else {
                    callback({status:true, cursos:cursos});
                }
                return;
            });
        },
        buscarCurso: function(req, res) {
            var idCurso = req.params.idCurso;
            if(idCurso) {
                curso
                    .findOne({codigo:idCurso})
                    .select('codigo descricao carga categoria')
                    .exec(function(error, course){
                        if(error) {
                            console.log(error);
                            res.status(500).json('Problemas ao buscar curso.');
                        } else {
                            if(course != null && course != undefined) {
                                res.status(200).json(
                                    {
                                        codigo:course.codigo,
                                        descricao:course.descricao,
                                        carga:course.carga,
                                        categoria:course.categoria
                                    }
                                );
                            } else {
                                res.status(404).json('Curso não encontrado.');
                            }
                        }
                        return;
                    });
            } else {
                res.status(500).json('Problemas ao verificar parâmetros.');
                return;
            }
        },
        removeCurso: function(req, res) {
            var idCurso = req.params.idCurso;
            if(idCurso) {
                curso.deleteOne({codigo:idCurso}, function(err, response){
                    if(err) {
                        console.log(err);
                        res.redirect('/listaCurso', {errorMessage:'Problemas ao remover curso.'});
                        return;
                    }
                });
            }
            res.redirect('/listaCurso');
            return;
        }
    }

    return CursoController;

}