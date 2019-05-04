const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const log = require('../../../logger')(__filename);
const usersHandler = require('./handlersUsers');
const refreshTokenService = require('../services/refreshToken');

const userAuthRoutes = new Router();
// const rules = require('./validationRulesTL');

const { SECRET } = process.env;

const USERS_LOGIN_ENDPOINT = '/api/v1/login';
const USERS_REGISTER_ENDPOINT = '/api/v1/registration';
const REFRESH_TOKEN = '/api/v1/refresh';
const LOGOUT = '/api/v1/logout';

userAuthRoutes.post(USERS_REGISTER_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const result = await usersHandler.registerNewUser(body);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Registration has failed');
  }
});

userAuthRoutes.post(REFRESH_TOKEN, async context => {
  const { body } = context.request;
  try {
    const { uId } = await refreshTokenService.updateRefreshToken(body);
    const response = {
      token: jwt.sign({ id: uId }, SECRET, {
        expiresIn: `${process.env.ACCESS_TOKEN_TIME}m`,
      }),
      generatedToken: jwt.sign({ id: uId }, SECRET, {
        expiresIn: `${process.env.REFRESH_TOKEN_TIME}h`,
      }),
    };
    await refreshTokenService.setRefreshToken({
      userId: uId,
      refreshToken: response.generatedToken,
    });
    context.body = response;
    context.status = 200;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Refresh has failed');
  }
});

userAuthRoutes.post(USERS_LOGIN_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const result = await usersHandler.loginHandler(body);
    if (result.status !== 200) {
      context.body = result.message;
      context.status = result.status;
      return;
    }
    const response = {
      token: jwt.sign({ id: result.id }, SECRET, {
        expiresIn: `${process.env.ACCESS_TOKEN_TIME}m`,
      }),
      generatedToken: jwt.sign({ id: result.id }, SECRET, {
        expiresIn: `${process.env.REFRESH_TOKEN_TIME}h`,
      }),
    };

    await refreshTokenService.setRefreshToken({
      userId: result.id,
      refreshToken: response.generatedToken,
    });

    context.body = { userId: result.id, message: result.message, tokens: response };
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Login has failed');
  }
});

userAuthRoutes.post(LOGOUT, async context => {
  const { token } = context.request;
  try {
    const result = await refreshTokenService.removeRefreshToken(token);
    context.body = result.message;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Removing refresh tokens has failed');
  }
});

module.exports = { userAuthRoutes };
