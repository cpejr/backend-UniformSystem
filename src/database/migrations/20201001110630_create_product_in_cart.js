
exports.up = function(knex) {
    return knex.schema.createTable('product_in_cart', function(table){
        table.increments('product_in_cart_id').primary();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');;
        table.integer('product_model_id').notNullable();
        table.foreign('product_model_id').references('product_model_id').inTable('product_model').onDelete('CASCADE').onUpdate('CASCADE');;
        table.integer('amount').notNullable();
        table.string('logo_link');
        table.enu('gender', ['M', 'F']).notNullable();
        table.string('size').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_in_cart');
};
