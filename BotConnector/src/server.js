const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const loginWizard = require('./scenes/auth/login');
const registerWizard = require('./scenes/auth/register');
const logoutWizard = require('./scenes/auth/logout');
const getNews = require('./scenes/news/news');

const { mainMenu } = require('./cards/auth');
const { mainCards } = require('./cards/menu');

const { triggerScenes, enterScenes, triggerCards } = require('./config/botKeyActionWords');

const log = require('./logger')(__filename);
const bot = require('./config');

const { enter } = Stage;

const stage = new Stage([loginWizard, registerWizard, logoutWizard, getNews]);

bot.use(session());
bot.use(stage.middleware());

bot.start(ctx =>
  ctx.reply(
    'Hello. If you are not registered user please click on the REGISTRATION or simple LOGIN. Also if you need a help enter /help ',
    mainMenu,
  ),
);

bot.help(ctx => ctx.reply('HERE SHOULD BE SOME HELP INFO =)'));
try {
  bot.action(triggerCards.MAIN, ctx => ctx.reply('Main Cards', mainCards));
} catch (error) {
  log.error(error, 'Cannot find HELP');
}

try {
  bot.action(triggerScenes.LOGIN, enter(enterScenes.LOGIN));
} catch (error) {
  log.error(error, 'Cannot find login scene');
}
try {
  bot.action(triggerScenes.REGISTRATION, enter(enterScenes.REGISTRATION));
} catch (error) {
  log.error(error, 'cannot find registration scene');
}

try {
  bot.action(triggerScenes.LOGOUT, enter(enterScenes.LOGOUT));
} catch (error) {
  log.error(error, 'cannot find logout scene');
}

try {
  bot.action(triggerScenes.NEWS, enter(enterScenes.NEWS));
} catch (error) {
  log.error(error, 'Cannot find news scene');
}

try {
  bot.launch();
  log.info('Bot has been started');
} catch (error) {
  log.fatal(error, 'FAILED TO START BOT');
  process.exit(1);
}

module.exports = {
  bot,
};
