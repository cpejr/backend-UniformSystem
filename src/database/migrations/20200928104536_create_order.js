
exports.up = function(knex) {
    return knex.schema.createTable('order', function(table){
        table.string('order_id').primary();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.boolean('is_paid').notNullable();
        table.string('shipping_data_id').notNullable();
        table.foreign('shipping_data_id').references('shipping_data_id').inTable('shipping_data').onDelete('cascade');
        table.string('status').notNullable();
        table.float('shipping').notNullable();
        table.timestamps(true, true); //created_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order');
};
