exports.up = function (knex) {
  return knex.schema.createTable("address", function (table) {
    table.increments("address_id").primary();
    table.string("street").notNullable();
    table.string("neighborhood").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("zip_code").notNullable();
    table.string("country").notNullable();
    table.string("complement").nullable();
    table
      .string("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("address");
};
