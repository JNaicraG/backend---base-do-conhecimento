const config = require('../knexfile.js');
const knex = require('knex')(config);

//Não é a melhor opção toda hora
//knex.migrate.latest(config);  //Ele executa a migração no momento que se executa o backend
//Evoluir o db é algo delicado/+controlado

module.exports = knex;
