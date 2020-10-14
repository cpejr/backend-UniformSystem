
exports.up = function(knex) {
    return knex.schema.createTable('product_in_order', function(table){
    table.integer('product_in_order_id').primary();
    table.integer('shirt_model_id').notNullable();
    table.foreign('shirt_model_id').references('shirt_model_id').inTable('shirt_model');
    table.string('order_id').primary();
    table.foreign('order_id').references('order_id').inTable('order').onDelete('cascade');
    table.float('product_price').notNullable();
    table.integer('amount').notNullable();
    table.string('logo_link').notNullable();
    table.float('discount').notNullable();
    table.string('size').notNullable();
    });
}; 

exports.down = function(knex) {
    return knex.schema.dropTable('product_in_order');
};
