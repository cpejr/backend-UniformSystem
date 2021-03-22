exports.up = function (knex) {
  return knex.schema.table("product", function (table) {
    table.float("height").notNullable().defaultTo(3);
    table.float("length").notNullable().defaultTo(3);
    table.float("weight").notNullable().defaultTo(3);
    table.float("width").notNullable().defaultTo(3);
  });
};

exports.down = function (knex) {
  return knex.schema.table("product", function (table) {
    table.dropColumn("height");
    table.dropColumn("length");
    table.dropColumn("weight");
    table.dropColumn("width");
  });
};
