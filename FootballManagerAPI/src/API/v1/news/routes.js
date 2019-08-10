const Router = require('koa-router');
const log = require('../../../logger')(__filename);
const newsHandler = require('./handlers');

const router = new Router();
const rules = require('./validationRules');

const NEWS_ENDPOINT = '/api/v1/news';

router.get(NEWS_ENDPOINT, async context => {
  try {
    const result = await newsHandler.getNews();
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Get news failed to receive');
  }
});

router.post(NEWS_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.addNewsValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await newsHandler.addNews(body);
    context.body = result;
    context.status = result.status;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'add news failed to create');
  }
});

router.delete(`${NEWS_ENDPOINT}/:id`, async context => {
  const id = { id: context.params.id };
  try {
    const validationResult = rules.deleteNewsValidation(id);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await newsHandler.deleteNews(id);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'delete news failed to delete');
  }
});

router.put(NEWS_ENDPOINT, async context => {
  const { body } = context.request;
  try {
    const validationResult = rules.updateNewsValidation(body);
    if (!validationResult) {
      context.status = 400;
      context.body = { message: 'You have entered incorrect parameters' };
    }
    const result = await newsHandler.updateNews(body);
    context.status = result.status;
    context.body = result;
  } catch (error) {
    context.status = error.statusCode || error.status || 500;
    context.body = {
      message: error.message,
    };
    log.error(error, 'Edit news failed to edit');
  }
});

module.exports = router;
