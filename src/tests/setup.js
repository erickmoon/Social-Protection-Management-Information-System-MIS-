require('dotenv').config({ path: '.env' });
const db = require('../config/database');

beforeAll(async () => {
  // Run migrations
  await db.migrate.latest();
});

afterAll(async () => {
  // Clean up database
  await db.migrate.rollback(true);
  await db.destroy();
});

beforeEach(async () => {
  // Clean all tables before each test
  await db('household_members').del();
  await db('household_heads').del();
  await db('locations').del();
  await db('programs').del();
});