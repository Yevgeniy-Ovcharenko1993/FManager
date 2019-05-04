const pino = require('pino');

module.exports = (name = '', conf = { base: null }) => {
  let ns = name;
  if (ns) {
    ns = name.replace(/.js$/, '');
  }

  const options = Object.assign({}, conf, {
    name: ns,
    level: process.env.LOG_LEVEL || 'trace',
    enabled: process.env.LOG_ENABLED || true,
  });

  const log = pino(options);
  log.fatal = (...args) => {
    log.error(...args);
    process.exit(1);
  };
  //   applicationCache.CHECKING();
  return log;
};
