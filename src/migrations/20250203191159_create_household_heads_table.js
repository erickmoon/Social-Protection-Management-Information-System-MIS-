exports.up = function (knex) {
  return knex.schema.createTable("household_heads", (table) => {
    table.increments("id").primary();
    table.string("full_name").notNullable();
    table.string("id_number").notNullable().unique();
    table.text("phone_number").notNullable(); // Encrypted
    table.string("gender");
    table.date("date_of_birth");
    table
      .integer("location_id")
      .references("id")
      .inTable("locations")
      .onDelete("SET NULL");
    table
      .integer("program_id")
      .references("id")
      .inTable("programs")
      .onDelete("SET NULL");
    table.string("marital_status");
    table.boolean("is_active").defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("household_heads");
};
