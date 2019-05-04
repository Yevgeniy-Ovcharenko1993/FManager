const { pgConnection } = require('../../connection');

async function selectFromTeamsLeagueJoin({ id }) {
  return pgConnection.query(
    `SELECT teamsleague.id, teamsleague.commandname, teamsleague.games, teamsleague.wins, teamsleague.draws, teamsleague.loses, teamsleague.goals, teamsleague.missed, teamsleague.scoredballs, leagues.title, leagues.imagesurl FROM teamsleague INNER JOIN leagues ON teamsleague.leagueid=leagues.id WHERE leagues.id = ${id};`,
  );
}

async function insertNewTeamsLeague({
  commandName,
  games,
  wins,
  draws,
  loses,
  goals,
  missed,
  scoredBalls,
  leagueId,
}) {
  return pgConnection.query(
    'INSERT INTO public.teamsleague (commandname, games, wins, draws, loses, goals, missed, scoredballs, leagueid) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [commandName, games, wins, draws, loses, goals, missed, scoredBalls, leagueId],
  );
}

async function deleteTeamFromTeamsLeague({ id }) {
  return pgConnection.query(`DELETE FROM public.teamsleague WHERE id = ${id}`);
}

async function updateTeamFromTeamLeague({
  id,
  commandName,
  games,
  wins,
  draws,
  loses,
  goals,
  missed,
  scoredBalls,
  leagueId,
}) {
  return pgConnection.query(
    `UPDATE public.teamsleague SET commandname = $1, games = $2, wins = $3, draws = $4, loses = $5, goals = $6, missed = $7, scoredballs = $8, leagueid = $9,  WHERE id = $10`,
    [commandName, games, wins, draws, loses, goals, missed, scoredBalls, leagueId, id],
  );
}

module.exports = {
  selectFromTeamsLeagueJoin,
  insertNewTeamsLeague,
  deleteTeamFromTeamsLeague,
  updateTeamFromTeamLeague,
};
