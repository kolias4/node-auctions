require('dotenv').config();


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user :process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    debug:process.env.NODE_ENV == 'development'?true:false
  });

  module.exports = knex