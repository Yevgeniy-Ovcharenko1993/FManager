const chapmLeague = require('../../../db/postgres/queriesChampLeague');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };

async function geChampLeague() {
  try {
    const { rows } = await chapmLeague.selectFromChampLeague();
    return { message: 'OK', status: 200, champLeagues: rows };
  } catch (error) {
    log.error(error, 'Get champ leagues failed to handle ');
    return badRequest;
  }
}

async function addChampLeague(obj) {
  try {
    await chapmLeague.insertChampLeague(obj);
    return { message: 'Created new Champ League', status: 200 };
  } catch (error) {
    log.error(error, 'Insert ChampLeague failed to handle');
    return badRequest;
  }
}

async function deleteChampLeague(id) {
  try {
    const { rowCount } = await chapmLeague.deleteChampLeague(id);
    if (rowCount === 0) {
      return { message: 'Not found. This item was deleted', status: 400 };
    }
    return { message: 'ChampLeague sucessfylly deleted', status: 200 };
  } catch (error) {
    log.error(error, 'Delete ChampLeague has failed to handle');
    return badRequest;
  }
}

async function updateChampLeague(obj) {
  try {
    await chapmLeague.updateChampLeague(obj);
    return { status: 200, message: 'ChampLeague has been updated' };
  } catch (error) {
    log.error(error, 'Update ChampLeague failed to handle');
    return badRequest;
  }
}

module.exports = {
  geChampLeague,
  addChampLeague,
  deleteChampLeague,
  updateChampLeague,
};
