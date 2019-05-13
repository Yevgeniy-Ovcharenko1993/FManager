const WizardScene = require('telegraf/scenes/wizard');
const log = require('../../logger')(__filename);
const api = require('../../services/api');
const { AUTH } = require('../../config/replyMessages');
const { wizardSceneFlags } = require('../../config/botKeyActionWords');

module.exports = new WizardScene(wizardSceneFlags.NEWS, async ctx => {
  try {
    const result = await api.getNews();
    if (!result) {
      ctx.reply(AUTH.NOT_AUTHENTIFICATEED);
    }
    ctx.replyWithPhoto(result.news[0].newsimage, {
      caption: `${result.news[0].title} \n${result.news[0].commandname} \n${
        result.news[0].description
      }`,
      parse_mode: 'Markdown',
    });
    return ctx.scene.leave();
  } catch (error) {
    log.error(error, 'Failed to get news. You are not authentificated');
    return ctx.scene.leave();
  }
});
