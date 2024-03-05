const app = require('express')();
const consign = require('consign');

consign()
    .then('./config/middlewares.js') //Local do middlware
    .into(app) //injeta em cada uma das dependecias carregadas o app

app.listen(3000, ()=>{
    console.log('Backend executando');
})
