
exports.up = function(knex) {
    return knex.schema.createTable('product_in_order', function(table){
    table.integer('product_in_order_id').primary();
    table.integer('product_model_id').notNullable();
    table.foreign('product_model_id').references('product_model_id').inTable('product_model').onDelete('SET NULL');
    table.string('order_id');
    table.foreign('order_id').references('order_id').inTable('order').onDelete('CASCADE');
    table.float('product_price').notNullable();
    table.integer('amount').notNullable();
    table.string('logo_link').notNullable();
    table.float('discount').notNullable();
    table.string('size').notNullable();
    table.string('gender').notNullable();
    });
}; 

exports.down = function(knex) {
    return knex.schema.dropTable('product_in_order');
};
