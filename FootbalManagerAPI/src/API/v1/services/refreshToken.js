const jwt = require('jsonwebtoken');
const refreshTokenQueries = require('../../../db/redis/refreshTokenQueries');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };
const sucess = { message: 'OK', status: 200 };

async function setRefreshToken(obj) {
  try {
    const setTokenResult = await refreshTokenQueries.setRefreshToken(obj);
    if (setTokenResult !== 'OK') {
      return badRequest;
    }
    return sucess;
  } catch (error) {
    log.error(error, 'Set refresh token failed to insert');
    return { message: 'Internal server error', status: 500 };
  }
}

async function updateRefreshToken({ refreshToken }) {
  try {
    const { payload } = jwt.decode(refreshToken, { complete: true });
    const refreshTokenDb = await refreshTokenQueries.getRefreshToken(payload.id);
    if (!refreshTokenDb) {
      return { message: 'Unautorized ', status: 401 };
    }
    return { status: 200, uId: payload.id };
  } catch (error) {
    log.error(error, 'Update refresh token failed to handle ');
    return { msg: 'Internal server error', status: 500 };
  }
}

async function removeRefreshToken(token) {
  try {
    const { payload } = jwt.decode(token, { complete: true });
    const result = await refreshTokenQueries.remove(payload.id);
    if (result !== 1) {
      return badRequest;
    }
    return { message: 'You are sucessfully logged out', status: 200 };
  } catch (error) {
    log.error(error, 'Refresh token failed to remove from DB');
    return { msg: 'Internal server error', status: 500 };
  }
}

module.exports = { updateRefreshToken, setRefreshToken, removeRefreshToken };
