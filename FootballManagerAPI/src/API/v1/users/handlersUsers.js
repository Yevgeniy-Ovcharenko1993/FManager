const bcrypt = require('bcryptjs');
const queriesUsers = require('../../../db/postgres/queriesUsers');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };

async function registerNewUser({ userName, email, userPassword }) {
  try {
    const hashPassword = await bcrypt.hashSync(userPassword);
    await queriesUsers.insertNewUser(userName, email, hashPassword);
    return { message: 'Created new user', status: 201 };
  } catch (error) {
    log.error(error, 'Register new user has failed in db ');
    return badRequest;
  }
}

async function loginHandler(obj) {
  try {
    const { userPassword } = obj;
    const { rows } = await queriesUsers.selectUserByEmail(obj);
    const passwordResult = await bcrypt.compareSync(userPassword, rows[0].userpassword);
    if (!passwordResult) {
      return { message: 'Your password is incorrect', status: 401 };
    }
    return { message: 'You are sucessfully logged in', status: 200, id: rows[0].id };
  } catch (error) {
    log.error(error, 'Login has failed ');
    return { message: 'User with current email address was not found ', status: 401 };
  }
}

module.exports = {
  registerNewUser,
  loginHandler,
};
