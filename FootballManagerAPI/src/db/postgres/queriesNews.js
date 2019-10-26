const { pgConnection } = require('../../connection');

async function selectFromNews() {
  return pgConnection().then(result => {
    result.query(
      'SELECT news.id, news.title, news.description, news.newsimage , news.publicdata, leagues.title, leagues.imagesurl, teamsleague.commandname FROM news INNER JOIN leagues ON news.leagueid=leagues.id INNER JOIN teamsleague on news.teamid=teamsleague.id;',
    );
  });
}

async function insertNewFootballNews({ title, description, newsImage, teamId, leagueId }) {
  return pgConnection().then(result => {
    result.query(
      'INSERT INTO public.news (title, description, publicdata, newsimage , teamid, leagueid) values ($1, $2, $3, $4, $5, $6)',
      [title, description, new Date().toISOString(), newsImage, teamId, leagueId],
    );
  });
}

async function deleteFootballNews({ id }) {
  return pgConnection().then(result => {
    result.query(`DELETE FROM news WHERE id = ${id}`);
  });
}

async function updateFootballNews({ id, title, description, newsImage, teamId, leagueId }) {
  return pgConnection().then(result => {
    result.query(
      'UPDATE public.news SET title = $1, description = $2, newsimage = $3 , publicdata = $4, teamid = $5, leagueid = $6 WHERE id = $7',
      [title, description, newsImage, new Date().toISOString(), teamId, leagueId, id],
    );
  });
}

module.exports = {
  selectFromNews,
  insertNewFootballNews,
  deleteFootballNews,
  updateFootballNews,
};
