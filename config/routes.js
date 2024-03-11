//const user = require('../api/user') //Não precisa pois, devido ao cosign, essa dependência já se encontra em app
module.exports = app => {

    //Colocar as urls mais específicas em cima e as mais genéricas (com parâmetros) embaixo


    //Únicas urls que não estarão sujeitas a valdação do token - urls públicas. Disponíveis para qualquer pessoa acessar
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signIn);
    app.post('validateToken', app.api.auth.validateToken);


    app.route('/users') //Associar a endpoint com o arquivo
        .all(app.config.passport.authenticate) //todos os verbos http passarão por esse filtro e somente chamará os verbos abaixo se o retorno for verdadeiro
        .post(app.api.user.save) //app.pasta.arquivo.função
        .get(app.api.user.get);

    app.route('/users/:id')
        .all(app.config.passport.authenticate)
        .put(app.api.user.save)
        .get(app.api.user.getById);

    app.route('/categories')
        .all(app.config.passport.authenticate)
        .get(app.api.category.get)
        .post(app.api.category.save);


    //tem que vir antes de :id para não haver erros e entender /tree como id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate)
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(app.config.passport.authenticate)
        .get(app.api.category.getById)
        .delete(app.api.category.remove)
        .put(app.api.category.save);

    app.route('/articles')
        .all(app.config.passport.authenticate)
        .get(app.api.article.get)
        .post(app.api.article.save);

    app.route('/articles/:id')
        .all(app.config.passport.authenticate)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
        .get(app.api.article.getById);

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate)
        .get(app.api.article.getByCategory);
}