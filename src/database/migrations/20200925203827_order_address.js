
exports.up = function(knex) {
    return knex.schema.createTable('order_address', function(table){
        table.integer('order_address_id').primary();
        table.string('street').notNullable();
        table.string('neighborhood').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('zip_code').notNullable();
        table.string('country').notNullable();
        table.string('complement').notNullable();
       
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order_address');
};
