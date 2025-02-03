exports.up = function (knex) {
  return knex.schema.createTable("programs", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.decimal("budget", 12, 2);
    table.date("start_date");
    table.date("end_date");
    table.boolean("is_active").defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("programs");
};
