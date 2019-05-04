const { pgConnection } = require('../../connection');

async function selectFromLeagues() {
  return pgConnection.query('SELECT * FROM public.leagues');
}

async function insertNewLeague({ title, imagesUrl }) {
  return pgConnection.query('INSERT INTO public.leagues (title, imagesurl) values($1, $2)', [
    title,
    imagesUrl,
  ]);
}

async function deleteLeague({ id }) {
  return pgConnection.query(`DELETE FROM leagues WHERE id = ${id}`);
}

async function updateLeague({ id, title, imagesUrl }) {
  return pgConnection.query(`UPDATE public.leagues SET title = $1, imagesurl = $2 WHERE id = $3`, [
    title,
    imagesUrl,
    id,
  ]);
}

module.exports = {
  selectFromLeagues,
  insertNewLeague,
  deleteLeague,
  updateLeague,
};
