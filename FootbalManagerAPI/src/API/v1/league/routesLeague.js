const Router = require('koa-router');
const log = require('../../../logger')(__filename);
const leagueHandler = require('./handlersLeague');

const router = new Router();
const rules = require('../league/validationRules');

const LEAGUES_ENDPOINT = '/api/v1/leagues';

router.get(LEAGUES_ENDPOINT, async context => {
  try {
    const result = await leagueHandler.getLeague();
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Get league failed to receive');
  }
});

router.post(LEAGUES_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.addLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await leagueHandler.addLeague(body);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'add league failed to create');
  }
});

router.delete(`${LEAGUES_ENDPOINT}/:id`, async context => {
  const id = { id: context.params.id };
  try {
    const validationResult = rules.deleteLeagueValidation(id);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await leagueHandler.deleteLeague(id);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'delete League failed to delete');
  }
});

router.put(LEAGUES_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.updateLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await leagueHandler.updateLeague(body);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Edit League failed to edit');
  }
});

module.exports = router;
