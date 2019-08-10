const jwt = require('jsonwebtoken');

async function jwtChecker(bearer) {
  return jwt.verify(bearer, process.env.SECRET);
}

module.exports = { jwtChecker };
