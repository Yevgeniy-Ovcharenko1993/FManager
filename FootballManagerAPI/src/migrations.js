const { pgConnection } = require('./connection');
const log = require('./logger')(__filename);

async function importDBSchema() {
  const connection = await pgConnection();
  if (connection) {
    await connection.query(
      'CREATE TABLE IF NOT EXISTS public.leagues (id SERIAL NOT NULL PRIMARY KEY, title varchar(255) NOT NULL, imagesUrl varchar(255) NOT NULL);',
    );
    log.info('finished creating leagues table ');

    await connection.query(
      'CREATE TABLE IF NOT EXISTS public.teamsleague (id SERIAL NOT NULL PRIMARY KEY, commandName varchar(255) NOT NULL, games integer, wins integer, draws integer, loses integer, goals integer, missed integer, scoredBalls integer, leagueid INTEGER REFERENCES leagues (id));',
    );
    log.info('finished creating teamsLeague table ');

    await connection.query(
      'CREATE TABLE IF NOT EXISTS public.champleague (id SERIAL NOT NULL PRIMARY KEY, groupName varchar(255) NOT NULL, games integer, wins integer, draws integer, loses integer, goals integer, missed integer, scoredBalls integer, teamid INTEGER REFERENCES teamsleague (id));',
    );
    log.info('finished creating champLeague table ');

    await connection.query(
      'CREATE TABLE IF NOT EXISTS public.news (id SERIAL NOT NULL PRIMARY KEY, title varchar(255) NOT NULL, description varchar(1024), publicData date, newsimage varchar(1024), leagueId INTEGER REFERENCES leagues (id), teamid INTEGER REFERENCES teamsleague (id));',
    );
    log.info('finished creating news table ');

    await connection.query(
      'CREATE TABLE IF NOT EXISTS public.users (id SERIAL NOT NULL PRIMARY KEY, username varchar(50) NOT NULL, email varchar(100) UNIQUE NOT NULL, userpassword  varchar(1024) NOT NULL);',
    );
    log.info('finished creating users table');
  } else {
    throw new Error('Failed to import schema');
  }
}

module.exports = { importDBSchema };
