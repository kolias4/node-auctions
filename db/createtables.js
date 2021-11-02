const knex = require("./knex")

const createtables = async () => {
 

      const hasUsers = await knex.schema.hasTable('users')
      // const hasOrders = await knex.schema.hasTable('orders')
      const hasProducts = await knex.schema.hasTable('products')
      const hasAuctions = await knex.schema.hasTable('auctions')
      const hasBids = await knex.schema.hasTable('bids')



      // console.log(hasUsers,hasOrders)
      

     
      
    
      // Create database schema. You should use knex migration files
      // to do this. We create it here for simplicity.
      !hasUsers && await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name',55).notNullable();
        table.string('email',55).unique().notNullable();
        table.string('password').notNullable();
        table.timestamps()
      });

      !hasProducts && await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name',55).notNullable();
        table.json('image');
        
      })

      !hasAuctions && await knex.schema.createTable('auctions', function(table){
        table.increments('id').primary();
        table.string('name',55).notNullable();
        table.datetime('start').notNullable();
        table.datetime('end').notNullable();
        table.float('startprice').notNullable();
        table.integer('product_id').unsigned().unique();
        table.foreign('product_id').references('id').inTable('products');
       
      })

      !hasBids && await knex.schema.createTable('bids', table => {
        table.increments('id').primary();
        table.float('price').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.integer('auction_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('auction_id').references('id').inTable('auctions');
      })

     

      // !hasOrders &&  await knex.schema.createTable('orders', table => {
      //   table.increments('id').primary();
      //   table.integer('user_id').unsigned().notNullable();
      //   table.foreign('user_id').references('id').inTable('users');
      // });
      knex.destroy()

      return "table Created";
    

}

module.exports=createtables