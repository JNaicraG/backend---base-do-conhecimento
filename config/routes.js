//const user = require('../api/user') //Não precisa pois, devido ao cosign, essa dependência já se encontra em app
module.exports = app => {

    //Colocar as urls mais específicas em cima e as mais genéricas (com parâmetros) embaixo

    app.route('/users') //Associar a endpoint com o arquivo
        .post(app.api.user.save) //app.pasta.arquivo.função
        .get(app.api.user.get);

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById);

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save);


    //tem que vir antes de :id para não haver erros e entender /tree como id
    app.route('/categories/tree')
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .delete(app.api.category.remove)
        .put(app.api.category.save);

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .put(app.api.article.save)
        .delete(app.api.article.remove)
        .get(app.api.article.getById)
}