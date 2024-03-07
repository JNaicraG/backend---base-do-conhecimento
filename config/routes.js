//const user = require('../api/user') //Não precisa pois, devido ao cosign, essa dependência já se encontra em app
module.exports = app => {
    app.route('/users') //Associar a endpoint com o arquivo
        .post(app.api.user.save) //app.pasta.arquivo.função
        .get(app.api.user.get);

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById);

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save);

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .delete(app.api.category.remove)
        .put(app.api.category.save);
}