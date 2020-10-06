
exports.up = function(knex) {
    return knex.schema.createTable('shirt_model', function(table){
        table.increments('shirt_model_id').primary();
        table.boolean('is_main').notNullable();
        table.string('img_link').notNullable();
        table.float('price').notNullable();
        table.string('shirt_id').notNullable();
        table.foreign('shirt_id').references('shirt_id').inTable('shirt');
        table.string('model_description').notNullable();
        table.enum('gender', ['M', 'F']).notNullable();
    });
        
};

exports.down = function(knex) {
    return knex.schema.dropTable('shirt_model');
};
 