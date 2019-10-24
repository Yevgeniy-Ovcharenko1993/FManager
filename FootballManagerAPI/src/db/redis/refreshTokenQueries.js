const { promisify } = require('util');
const { redisConnection } = require('../../connection');

const getAsync = promisify(redisConnection().get).bind(redisConnection());
const setAsync = promisify(redisConnection().set).bind(redisConnection());
const removeAsync = promisify(redisConnection().del).bind(redisConnection());

async function setRefreshToken({ userId, refreshToken }) {
  return setAsync(userId, refreshToken, 'EX', 2000);
}

async function getRefreshToken(userId) {
  return getAsync(userId);
}

async function remove(userId) {
  return removeAsync(userId);
}

module.exports = { setRefreshToken, getRefreshToken, remove };
