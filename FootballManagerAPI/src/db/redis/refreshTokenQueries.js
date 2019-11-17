const { promisify } = require('util');
const { redisClient } = require('../../connection');

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const removeAsync = promisify(redisClient.del).bind(redisClient);

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
