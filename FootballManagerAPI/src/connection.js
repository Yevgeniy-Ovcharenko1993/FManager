const pg = require('pg');
const redis = require('redis');
const log = require('./logger')(__filename);
const { POSTGRES_CONFIG, REDIS_CONFIG } = require('./config');

async function pgConnection() {
  const pc = new pg.Pool(POSTGRES_CONFIG);
  if (pc) {
    await pc.connect();
    return pc;
  }
  throw new Error('error');
}

const redisClient = redis.createClient({ port: REDIS_CONFIG.port, host: REDIS_CONFIG.host });

redisClient.on('connect', () => {
  log.info('Connected to Redis');
  if (process.env.DB_REDIS_PASSWORD) {
    redisClient.auth(process.env.DB_REDIS_PASSWORD, () => {
      log.info('Redis is authorized');
      redisClient.select(0);
    });
  } else {
    redisClient.select(0);
  }
});

redisClient.on('error', err => {
  log.error(err, 'Error connecting to Redis');
  // process.exit(1);
});

redisClient.on('ready', () => {
  log.info('Redis is ready');
});

module.exports = {
  pgConnection,
  redisClient,
};
