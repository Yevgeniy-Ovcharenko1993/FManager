const Extra = require('telegraf/extra');
const { triggerScenes } = require('../config/botKeyActionWords');

const mainMenu = Extra.HTML().markup(message =>
  message.inlineKeyboard([
    [message.callbackButton('REGISTRATION', triggerScenes.REGISTRATION)],
    [message.callbackButton('LOGIN', triggerScenes.LOGIN)],
    [message.callbackButton('Logout', triggerScenes.LOGOUT)],
    [message.callbackButton('ENTER', 'enter')],
  ]),
);

module.exports = {
  mainMenu,
};
