exports.up = function (knex) {
  return knex.schema.createTable("household_members", (table) => {
    table.increments("id").primary();
    table.string("full_name").notNullable();
    table.integer("age").notNullable();
    table.string("gender");
    table.string("relationship").notNullable();
    table.date("date_of_birth");
    table.string("education_level");
    table.boolean("is_student").defaultTo(false);
    table
      .integer("household_head_id")
      .references("id")
      .inTable("household_heads")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("household_members");
};
