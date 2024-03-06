//const user = require('../api/user') //Não precisa pois, devido ao cosign, essa dependência já se encontra em app
module.exports = app =>{
    app.route('/users') //Associar a endpoint com o arquivo
        .post(app.api.user.save) //app.pasta.arquivo.função
        .get(app.api.user.get);

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById);
}