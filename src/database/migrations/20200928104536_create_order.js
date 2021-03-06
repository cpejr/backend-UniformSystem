exports.up = function (knex) {
  return knex.schema.createTable("order", function (table) {
    table.string("order_id").primary();
    table
      .string("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table
      .integer("shipping_data_id")
      .references("shipping_data_id")
      .inTable("shipping_data")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table
      .enu("status", ["waitingPayment", "preparing", "delivered", "pending"])
      .notNullable();
    table.timestamps(true, true); //created_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("order");
};
