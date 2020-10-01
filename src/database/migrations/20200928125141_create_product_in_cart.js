
exports.up = function(knex) {
    return knex.schema.createTable('product_in_cart', function(table){
        table.increments('product_in_cart_id').notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.string('cart_id').notNullable();
        table.string('product_id').notNullable();
        table.integer('amount').notNullable();
        table.string('logo_link');
        table.string('text');
        table.string('size').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_in_cart');
};
