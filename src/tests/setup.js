const { knex } = require("../config/database");

beforeAll(async () => {
  // Run migrations
  await knex.migrate.latest();
});

afterAll(async () => {
  // Clean up database
  await knex.migrate.rollback(true);
  await knex.destroy();
});

beforeEach(async () => {
  // Clean all tables before each test
  await knex("household_members").del();
  await knex("household_heads").del();
  await knex("locations").del();
  await knex("programs").del();
});
