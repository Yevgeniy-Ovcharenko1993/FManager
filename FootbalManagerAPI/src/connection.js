const pg = require('pg');
const redis = require('redis');
const log = require('./logger')(__filename);
const { POSTGRES_CONFIG, REDIS_CONFIG } = require('./config');

const pgConnection = new pg.Pool(POSTGRES_CONFIG);
try {
  pgConnection.connect();
} catch (error) {
  log.fatal(error, 'INITIAL conection to DB has been failed');
  process.exit(1);
}

const redisConnection = redis.createClient({ port: REDIS_CONFIG.port, host: REDIS_CONFIG.host });

redisConnection.on('connect', () => {
  log.info('Connected to Redis');
  if (process.env.DB_REDIS_PASSWORD) {
    redisConnection.auth(process.env.DB_REDIS_PASSWORD, () => {
      log.info('Redis is authorized');
      redisConnection.select(0);
    });
  } else {
    redisConnection.select(0);
  }
});

redisConnection.on('error', err => {
  log.fatal(`Error connecting to Redis: ${err}`);
  process.exit(1);
});

redisConnection.on('ready', () => {
  log.info('Redis is ready');
});

module.exports = {
  pgConnection,
  redisConnection,
};
