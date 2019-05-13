const WizardScene = require('telegraf/scenes/wizard');
const api = require('../../services/api');
const { wizardSceneFlags } = require('../../config/botKeyActionWords');

module.exports = new WizardScene(wizardSceneFlags.LOGOUT, async ctx => {
  const result = await api.logout();
  if (!result) {
    ctx.reply('Oops something went wrong, please try later');
    return ctx.scene.leave();
  }
  ctx.reply('You are sucessfully logged out ');
  return ctx.scene.leave();
});
