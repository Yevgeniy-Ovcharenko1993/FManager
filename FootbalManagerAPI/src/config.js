require('dotenv').config();

const POSTGRES_CONFIG = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost' || 'postgres',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
};

const REDIS_CONFIG = {
  port: 6379,
  host: process.env.DB_REDIS_HOST,
  password: process.env.DB_REDIS_PASSWORD,
};

module.exports = {
  POSTGRES_CONFIG,
  REDIS_CONFIG,
};
