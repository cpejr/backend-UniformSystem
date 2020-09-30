
exports.up = function(knex) {
    return knex.schema.createTable('order', function(table){
        table.string('order_id').primary();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.boolean('is_paid').notNullable();
        table.string('order_address_id').notNullable();
        table.foreign('order_address_id').references('order_address_id').inTable('order_address');
        table.string('status').notNullable();
        table.timestamps(true, true); //created_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order');
};
