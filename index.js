const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

//O knex facilita a integração com o db
app.db = db; //recebe o knex já configurado



consign() //Ele lê os arquivos de config em separado para maior controle - primeiro os middlewares, depois as apis que serão usadas em rotas, e aí rotas
    .include('./config/passport.js') //agora tem o método a disposição e pode acessar a partir das rotas (ou qualquer outro) //usamos o include porque se trata de um carregamento de modelo. O then é destinado para controllers.
    .then('./config/middlewares.js') //Local do middlware
    .then('./api/validation.js') //pois pode acabar carregando depois de userApi se não fizer
    .then('./api') //Lê todos os arquvios em api
    .then('./config/routes.js') 
    .into(app) //injeta em cada uma das dependecias carregadas o app

/*
Explicação maior de include e then
O then repete a operação anterior, porém com outro parâmetro. Para evitar que o código fique: 

include()
.include()
.include()
Preferiram criar o then como uma espécie de coringa, dessa maneira ele realiza:

include()
.then()
.then()
Fica mais legível. "Inclua aqui e depois aqui e depois aqui" Sacou?
*/
app.listen(3000, ()=>{
    console.log('Backend executando');
})
