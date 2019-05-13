const WizardScene = require('telegraf/scenes/wizard');
const api = require('../../services/api');
const { wizardSceneFlags } = require('../../config/botKeyActionWords');

let email;
let password;

module.exports = new WizardScene(
  wizardSceneFlags.LOGIN,
  ctx => {
    ctx.reply('Welcome to login scene.\nPlease enter an email');
    return ctx.wizard.next();
  },
  ctx => {
    email = ctx.update.message.text;
    ctx.reply(`Please enter a password`);
    return ctx.wizard.next();
  },
  async ctx => {
    password = ctx.update.message.text;
    const result = await api.login(email, password);
    if (!result) {
      ctx.reply('Your login has failed. \nPlease try again');
      return ctx.scene.leave();
    }
    ctx.reply(`You are sucessfully logged in.`);
    return ctx.scene.leave();
  },
);
