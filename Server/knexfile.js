const env = require('dotenv');
env.config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: +process.env.MYSQL_PORT,
    },
    pool: {
      min: 0,
      max: 10,
    },
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: +process.env.MYSQL_PORT,
    },
    pool: {
      min: 0,
      max: 10,
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: +process.env.MYSQL_PORT,
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
};
