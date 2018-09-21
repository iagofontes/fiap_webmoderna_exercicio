module.exports = function (app) {
    var mongoose = require('mongoose');
    var usuario = mongoose.Schema({
        email: { type: String, required: true },
        senha: { type: String, required: true },
        code: { type: String, unique: true }
    });
    return mongoose.model('usuario', usuario);
};