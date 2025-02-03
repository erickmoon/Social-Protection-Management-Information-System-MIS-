exports.up = function (knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("county").notNullable();
    table.string("sub_county").notNullable();
    table.string("location").notNullable();
    table.string("sub_location").notNullable();
    table.string("ward");
    table.decimal("latitude", 10, 8);
    table.decimal("longitude", 11, 8);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("locations");
};
