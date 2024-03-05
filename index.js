const app = require('express')();
const consign = require('consign');

consign() //Ele lê os arquivos de config em separado para maior controle - primeiro os middlewares, depois as apis que serão usadas em rotas, e aí rotas
    .then('./config/middlewares.js') //Local do middlware
    .then('./api') //Lê todos os arquvios em api
    .then('./config/routes.js') 
    .into(app) //injeta em cada uma das dependecias carregadas o app

app.listen(3000, ()=>{
    console.log('Backend executando');
})
