const { pgConnection } = require('../../connection');

async function selectFromChampLeague() {
  return pgConnection().then(result => {
    result.query(
      'SELECT champleague.groupname, champleague.games, champleague.wins, champleague.draws, champleague.loses, champleague.goals, champleague.missed, champleague.scoredballs, teamsleague.commandname FROM champleague INNER JOIN teamsleague ON champleague.teamid=teamsleague.id',
    );
  });
}

async function insertChampLeague({
  groupName,
  games,
  wins,
  draws,
  loses,
  goals,
  missed,
  scoredBalls,
  teamId,
}) {
  return pgConnection().then(result => {
    result.query(
      'INSERT INTO public.champleague (groupname, games, wins, draws, loses, goals, missed, scoredballs, teamid) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [groupName, games, wins, draws, loses, goals, missed, scoredBalls, teamId],
    );
  });
}

async function deleteChampLeague({ id }) {
  return pgConnection().then(result => {
    result.query(`DELETE FROM public.champleague WHERE id = ${id}`);
  });
}

async function updateChampLeague({
  id,
  groupName,
  games,
  wins,
  draws,
  loses,
  goals,
  missed,
  scoredBalls,
  teamId,
}) {
  return pgConnection().then(result => {
    result.query(
      `UPDATE public.champleague SET groupname = $1, games = $2, wins = $3, draws = $4, loses = $5, goals = $6, missed = $7, scoredballs = $8, teamid = $9 WHERE id = $10`,
      [groupName, games, wins, draws, loses, goals, missed, scoredBalls, teamId, id],
    );
  });
}

module.exports = {
  selectFromChampLeague,
  insertChampLeague,
  deleteChampLeague,
  updateChampLeague,
};
