// Update with your config settings.
//npx knex init para inicializar esse arquivo: https://stackoverflow.com/questions/50706399/node-js-knex-command-not-found


module.exports = {

  //development: { //Pode ter várias conexões diferentes - pra dev, prod, teste, etc
  //  client: 'sqlite3',
  //  connection: {
  //    filename: './dev.sqlite3'
  //  }
  //},

  //staging: {
  //  client: 'postgresql',
  //  connection: {
  //    database: 'my_db',
  //    user:     'username',
  //    password: 'password'
  //  },
  //  pool: {
  //    min: 2,
  //    max: 10
  //  },
  //  migrations: {
  //    tableName: 'knex_migrations'
  //  }
  //},

  //production: { //Tirando essa chave agora estamos diretamente conectados ao banco pelo module.exports
    client: 'postgresql',
    connection: {
      database: 'knowledge',
      user:     'postgres',
      password: '4474'
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  //}

};
