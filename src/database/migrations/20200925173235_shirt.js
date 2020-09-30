
exports.up = function(knex) {
    return knex.schema.createTable('shirt', function(table){
        table.integer('shirt_id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.timestamps(true, true);//created at
        table.string('product_type').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shirt');
};
