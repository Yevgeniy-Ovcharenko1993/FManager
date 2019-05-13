const WizardScene = require('telegraf/scenes/wizard');
const auth = require('../../services/api');
const { wizardSceneFlags } = require('../../config/botKeyActionWords');

let email;
let password;

module.exports = new WizardScene(
  wizardSceneFlags.REGISTER,
  ctx => {
    ctx.reply('Welcome to registration scene.\nPlease enter an email');
    return ctx.wizard.next();
  },
  ctx => {
    email = ctx.update.message.text;
    ctx.reply(`Please enter a password`);
    return ctx.wizard.next();
  },
  async ctx => {
    password = ctx.update.message.text;
    const result = await auth.register(email, password);
    if (!result) {
      ctx.reply(`Your registration has failed. \nPlease try again.`);
      return ctx.scene.leave();
    }
    ctx.reply(
      `You are sucessfully logged in. \nlease loggin into the system before start using features`,
    );
    return ctx.scene.leave();
  },
);
