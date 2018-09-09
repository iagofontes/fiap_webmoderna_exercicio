exports.notFound = function (request, response, next) {
    response.status(404);
    response.render('erro-404');
};
exports.serverError = function (error, request, response, next) {
    response.status(500);
    response.render('erro-servidor', { error: error });
};