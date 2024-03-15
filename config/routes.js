const admin = require('./admin') //passado como admin(app.api.xyz.abc) por exemplo

//const user = require('../api/user') //Não precisa pois, devido ao cosign, essa dependência já se encontra em app
module.exports = app => {

    //Colocar as urls mais específicas em cima e as mais genéricas (com parâmetros) embaixo


    //Únicas urls que não estarão sujeitas a valdação do token - urls públicas. Disponíveis para qualquer pessoa acessar
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signIn);
    app.post('/validateToken', app.api.auth.validateToken);

    //por essa url precisa ser admin nessa app
    app.route('/users') //Associar a endpoint com o arquivo
        .all(app.config.passport.authenticate()) //todos os verbos http passarão por esse filtro e somente chamará os verbos abaixo se o retorno for verdadeiro
        .post(admin(app.api.user.save)) //app.pasta.arquivo.função
        .get(admin(app.api.user.get));

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove));

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save));


    //tem que vir antes de :id para não haver erros e entender /tree como id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree); ///usuário pega categoria por aqui

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .delete(admin(app.api.category.remove))
        .put(admin(app.api.category.save));

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get)) //método pro admin ver
        .post(admin(app.api.article.save));

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove));

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory); //método pro usuário ver
        
        app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}