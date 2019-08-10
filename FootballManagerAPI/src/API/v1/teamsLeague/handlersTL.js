const teamsLeague = require('../../../db/postgres/queriesTL');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };

async function getTeamsLeagueJoin(id) {
  try {
    const { rows } = await teamsLeague.selectFromTeamsLeagueJoin(id);
    return { message: 'OK', status: 200, teams: rows };
  } catch (error) {
    log.error(error, 'Get teams failed to handle ');
    return badRequest;
  }
}

async function addTeamLeague(obj) {
  try {
    await teamsLeague.insertNewTeamsLeague(obj);
    return { message: 'Created new footbal teams in league', status: 200 };
  } catch (error) {
    log.error(error, 'Insert new teams in league has failed to handle');
    return badRequest;
  }
}

async function deleteTeam(id) {
  try {
    const { rowCount } = await teamsLeague.deleteTeamFromTeamsLeague(id);
    if (rowCount === 0) {
      return { message: 'Not found. This item was deleted', status: 400 };
    }
    return { message: 'Teams league sucessfylly deleted', status: 200 };
  } catch (error) {
    log.error(error, 'Delete team has failed to handle');
    return badRequest;
  }
}

async function updateTeam(obj) {
  try {
    await teamsLeague.updateTeamFromTeamLeague(obj);
    return { status: 200, message: 'Football team league has been updated' };
  } catch (error) {
    log.error(error, 'Update team league failed to handle');
    return badRequest;
  }
}

module.exports = {
  getTeamsLeagueJoin,
  addTeamLeague,
  deleteTeam,
  updateTeam,
};
