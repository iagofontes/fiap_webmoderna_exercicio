module.exports = function(app) {

    var usuario = app.models.usuario;

    var UsuarioController = {
        gerenciaUsuario: function(req, res) {
            usuario.find(function (erro, usuarios) {
                if (erro) {
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
                response.redirect('/gerenciaUsuario');
            } else {
                var user = request.body.usuario;
                usuario.create(user, function (erro, user) {
                    if (erro) {
                        console.log(erro);
                        response.redirect('/gerenciaUsuario');
                    } else {
                        response.redirect('/home');
                    }
               });
            }
        }
    }

    return UsuarioController;

}