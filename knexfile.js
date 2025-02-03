// knexfile.js
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  }
};
