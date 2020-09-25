
exports.up = function(knex) {
    return knex.schema.createTable('cart', function(table){
        table.string('cart_id').primary();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cart');
};
