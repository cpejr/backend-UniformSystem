
exports.up = function(knex) {
    return knex.schema.createTable('product_model', function(table){
        table.increments('product_model_id').primary();
        table.string('img_link').notNullable();
        table.float('price').notNullable();
        table.integer('product_id').notNullable();
        table.foreign('product_id').references('product_id').inTable('product').onDelete('CASCADE');
        table.string('model_description').notNullable();
        table.enum('gender', ['M', 'F']).nullable();
        table.boolean('available').notNullable();
    });
        
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_model');
};
 