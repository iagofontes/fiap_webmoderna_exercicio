var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();

var error = require('./middlewares/error');

var mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost:27017/rm331535');

mongoose.connection.on('connected', function () {
    console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
    console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('=====Conexão finalizada=====');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('exercicio'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

load('models')
    .then('controllers')
    .then('routes')
    .then('models')
    .into(app);

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function () {
    console.log("Aplicação no ar.");
});
