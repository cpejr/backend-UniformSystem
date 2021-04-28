exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("user_id").notNullable().primary();
    table.string("name").notNullable();
    table.string("firebase_uid");
    table.enu("user_type", ["client", "employee", "adm"]).notNullable();
    table.string("email").notNullable();
    table.string("cpf").unique().notNullable();
    table.string("telefone").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
