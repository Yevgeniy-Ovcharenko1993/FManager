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

function redisConnection() {
  const rc = redis.createClient({ port: REDIS_CONFIG.port, host: REDIS_CONFIG.host });

  rc.on('connect', () => {
    log.info('Connected to Redis');
    if (process.env.DB_REDIS_PASSWORD) {
      rc.auth(process.env.DB_REDIS_PASSWORD, () => {
        log.info('Redis is authorized');
        rc.select(0);
      });
    } else {
      rc.select(0);
    }
  });

  rc.on('error', err => {
    log.fatal(`Error connecting to Redis: ${err}`);
    process.exit(1);
  });

  rc.on('ready', () => {
    log.info('Redis is ready');
  });
  return rc;
}

module.exports = {
  pgConnection,
  redisConnection,
};
