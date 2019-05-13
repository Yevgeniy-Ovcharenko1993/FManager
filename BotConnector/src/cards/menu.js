const Extra = require('telegraf/extra');

const mainCards = Extra.HTML().markup(message =>
  message.inlineKeyboard([[message.callbackButton('NEWS', 'news')]]),
);

module.exports = {
  mainCards,
};
