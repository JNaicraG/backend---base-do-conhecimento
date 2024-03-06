// npx knex migrate:make create_table_users p/ criar migrations
//npx knex migrate:latest pra atualizar as migrations com o banco de dados
//npx knex migrate:rollback ele dá down
exports.up = function(knex, Promise) { //Banco de dados "evolui" - cria table, altera tablea, exclui, etc. Vai para versões mais novas
  //O return nós dá uma maior visualização do que está sendo feito para debug
  return knex.schema.createTable('users', table =>{
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('password').notNull();
    table.boolean('admin').notNull().defaultTo(false);
  });

};

exports.down = function(knex, Promise) { //Desfaz o que foi feito no up
    //Tem que ser feito o exato oposto do método up
    return knex.schema.dropTable('users');
  
};
