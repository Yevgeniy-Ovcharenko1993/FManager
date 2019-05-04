const leagues = require('../../../db/postgres/queriesLeagues');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };

async function getLeague(obj) {
  try {
    const { rows } = await leagues.selectFromLeagues(obj);
    return { message: 'OK', status: 200, leagues: rows };
  } catch (error) {
    log.error(error, 'Get leagues failed to handle ');
    return badRequest;
  }
}

async function addLeague(obj) {
  try {
    await leagues.insertNewLeague(obj);
    return { message: 'Created new league', status: 200 };
  } catch (error) {
    log.error(error, 'Insert league failed to handle');
    return badRequest;
  }
}

async function deleteLeague(id) {
  try {
    const { rowCount } = await leagues.deleteLeague(id);
    if (rowCount === 0) {
      return { message: 'Not found. This item was deleted', status: 400 };
    }
    return { message: 'League sucessfylly deleted', status: 200 };
  } catch (error) {
    log.error(error, 'Delete league has failed to handle');
    return badRequest;
  }
}

async function updateLeague(obj) {
  try {
    await leagues.updateLeague(obj);
    return { status: 200, message: 'League has been updated' };
  } catch (error) {
    log.error(error, 'Update league failed to handle');
    return badRequest;
  }
}

module.exports = {
  getLeague,
  addLeague,
  deleteLeague,
  updateLeague,
};
