const { pgConnection } = require('../../connection');

async function selectAllUsers() {
  return pgConnection.query('SELECT * FROM public.users');
}

async function selectUserByEmail({ email }) {
  return pgConnection.query(`SELECT * FROM public.users WHERE email=$1`, [email]);
}

async function insertNewUser(userName, email, userPassword) {
  return pgConnection.query(
    'INSERT INTO public.users (username, email, userpassword) values($1, $2, $3)',
    [userName, email, userPassword],
  );
}

async function deleteUser({ id }) {
  return pgConnection.query(`DELETE FROM public.users WHERE id = $1`, [id]);
}

async function updateUser({ id, userName, email, userPassword }) {
  return pgConnection.query(
    `UPDATE public.users SET username = $1, email = $2, userpassword = $3 WHERE id = $4`,
    [userName, email, userPassword, id],
  );
}

module.exports = {
  selectAllUsers,
  selectUserByEmail,
  insertNewUser,
  deleteUser,
  updateUser,
};
