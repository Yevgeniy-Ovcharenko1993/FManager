const Koa = require('koa');
const koaBody = require('koa-body');
const koaJWT = require('koa-jwt');
const bearer = require('koa-bearer-token');
const hlmet = require('koa-helmet');

const log = require('./logger')(__filename);
const importSchema = require('./migrations');

const { pgConnection } = require('./connection');
const { redisConnection } = require('./connection');

const routerNews = require('./API/v1/news/routes');
const routerTeamsLeague = require('./API/v1/teamsLeague/routesTL');
const routerLeagues = require('./API/v1/league/routesLeague');
const routerChampLeague = require('./API/v1/champLeague/routesChampLeague');
const { userAuthRoutes } = require('./API/v1/users/usersAuthRoutes');

const app = new Koa();

const { PORT, SECRET } = process.env;

app.use(koaBody());
app.use(bearer());
app.use(hlmet());

app.use(userAuthRoutes.routes());
app.use(userAuthRoutes.allowedMethods());

app.use(koaJWT({ secret: SECRET }));

app.use(routerNews.routes());
app.use(routerNews.allowedMethods());

app.use(routerTeamsLeague.routes());
app.use(routerTeamsLeague.allowedMethods());

app.use(routerLeagues.routes());
app.use(routerLeagues.allowedMethods());

app.use(routerChampLeague.routes());
app.use(routerChampLeague.allowedMethods());

app.listen(PORT, () => {
  log.info(`server has been started on http://localhost:${PORT}`);
  importSchema.importDBSchema();
});

process.on('SIGINT', async () => {
  try {
    log.info('SIGINT signal received.');
    await pgConnection.end();
    log.info('Postgress connection disconnected.');
    await redisConnection.end(true);
    log.info('Redis connection disconnected.');
  } catch (err) {
    log.fatal(err.message, 'Server shutdown error:');
  }
  process.exit(1);
});
