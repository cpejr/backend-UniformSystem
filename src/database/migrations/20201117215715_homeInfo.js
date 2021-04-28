
exports.up = function(knex) {
    return knex.schema.createTable('homeInfo', function(table){
        table.string('homeInfo_id').notNullable().primary();
        table.string('key').notNullable().unique();
        table.string('data', 1100).notNullable();  // limite de 1100 char's, lembrando que varchar conta espaços e o padrão é 255
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('homeInfo');
};
