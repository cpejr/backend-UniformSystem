// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/mydb.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    }
  },
};
