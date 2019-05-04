const Router = require('koa-router');
const log = require('../../../logger')(__filename);
const teamsHandler = require('./handlersTL');

const router = new Router();
const rules = require('./validationRulesTL');

const TEAMS_LEAGUE_ENDPOINT = '/api/v1/teamsleague';

router.get(`${TEAMS_LEAGUE_ENDPOINT}/:id`, async context => {
  const id = { id: context.params.id };
  try {
    const result = await teamsHandler.getTeamsLeagueJoin(id);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Get teamsleague failed to receive');
  }
});

router.post(TEAMS_LEAGUE_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.addTeamdsLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await teamsHandler.addTeamLeague(body);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'add new teams league failed to create');
  }
});

router.delete(`${TEAMS_LEAGUE_ENDPOINT}/:id`, async context => {
  const id = { id: context.params.id };
  try {
    const validationResult = rules.deleteTeamLeagueValidation(id);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await teamsHandler.deleteTeam(id);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'delete teams league failed to delete');
  }
});

router.put(TEAMS_LEAGUE_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.updateTeamLeagueValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await teamsHandler.updateTeam(body);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Edit teams league failed to edit');
  }
});

module.exports = router;
