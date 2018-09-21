module.exports = function(app) {

    var usuario = app.models.usuario;

    var UsuarioController = {
        gerenciaUsuario: function(req, res) {
            usuario.find(function (erro, usuarios) {
                if (erro) {
                    console.log('********************');
                    console.log('Erro durante busca por usuários.');
                    console.log(erro);
                    console.log('********************');                    
                    res.render('/home');
                } else {
                    res.render('usuario/gerencia-usuario', {usuarios:usuarios});
                }
            });
        },
        //cadastro de usuários
        adicionarUsuario: function (request, response) {

            var email = request.body.usuario.email;
            var senha = request.body.usuario.senha;
            var confirma = request.body.usuario.confirma;
            if (
            (senha != confirma) || 
            ((senha.trim().length == 0) || (confirma.trim().length == 0)) || 
            email.trim().length == 0) {
                console.log('********************');
                console.log('Erro durante validação.');
                console.log('********************');
                response.redirect('/gerenciaUsuario');
            } else {
                var usu = {
                    email:request.body.usuario.email, 
                    senha:request.body.usuario.senha,
                    code: (new Date()).getTime()
                };
                usuario.create(usu, 
                function (erro, usu) {
                    if (erro) {
                        console.log('********************');
                        console.log('Erro ao salvar registro, descricao abaixo: ');
                        console.log(erro);
                        console.log('********************');
                        response.redirect('/gerenciaUsuario');
                    } else {
                        response.redirect('/home');
                    }
               });
            }
        },
        removerUsuario: function (request, response) {
            var idUsuario = request.params.idUsuario;
            if(idUsuario) {
                usuario.deleteOne({_id:idUsuario}, function(err, response){
                    if(err) {
                        console.log('********************');
                        console.log('Erro ao remover registro, descricao abaixo: ');
                        console.log(err);
                        console.log('********************');
                    }
                });
            }
            response.redirect('/gerenciaUsuario');
            return;
        }
    }

    return UsuarioController;

}