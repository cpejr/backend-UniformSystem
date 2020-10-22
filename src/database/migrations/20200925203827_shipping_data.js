 
exports.up = function(knex) {
    return knex.schema.createTable('shipping_data', function(table){
        table.integer('shipping_data_id').primary();
        table.string('street').notNullable();
        table.string('neighborhood').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('zip_code').notNullable();
        table.string('country').notNullable();
        table.string('complement').notNullable();
        table.float('shipping_value');
        table.string('service_code').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shipping_data');
};
