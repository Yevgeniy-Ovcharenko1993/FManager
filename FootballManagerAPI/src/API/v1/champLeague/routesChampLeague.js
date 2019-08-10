const Router = require('koa-router');
const log = require('../../../logger')(__filename);
const champLeagueHandler = require('./handlersChampLeague');

const router = new Router();
const rules = require('../champLeague/validationRules');

const CHAMP_LEAGUES_ENDPOINT = '/api/v1/champLeagues';

router.get(CHAMP_LEAGUES_ENDPOINT, async context => {
  try {
    const result = await champLeagueHandler.geChampLeague();
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Get ChampLeague failed to receive');
  }
});

router.post(CHAMP_LEAGUES_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.addChampLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await champLeagueHandler.addChampLeague(body);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'add ChampLeague failed to create');
  }
});

router.delete(`${CHAMP_LEAGUES_ENDPOINT}/:id`, async context => {
  const id = { id: context.params.id };
  try {
    const validationResult = rules.deleteChampLeagueValidation(id);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await champLeagueHandler.deleteChampLeague(id);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'delete ChampLeague failed to delete');
  }
});

router.put(CHAMP_LEAGUES_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.updateChampLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await champLeagueHandler.updateChampLeague(body);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Edit ChampLeague failed to edit');
  }
});

module.exports = router;
