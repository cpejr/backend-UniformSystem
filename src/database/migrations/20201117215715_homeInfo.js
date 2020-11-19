
exports.up = function(knex) {
    return knex.schema.createTable('homeInfo', function(table){
        table.string('homeInfo_id').notNullable().primary();
        table.string('key').notNullable().unique();
        table.string('data').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('homeInfo');
};
