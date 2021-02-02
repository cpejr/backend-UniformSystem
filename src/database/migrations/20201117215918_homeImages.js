
exports.up = function(knex) {
    return knex.schema.createTable('homeImages', function(table){
        table.string('image_id').notNullable().primary();
        table.string('imgSrc').notNullable();
        table.string('imgAlt').notNullable();
        table.enu('imgPlace', ['carousel', 'whoWeAre', 'products']).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('homeImages');
};
