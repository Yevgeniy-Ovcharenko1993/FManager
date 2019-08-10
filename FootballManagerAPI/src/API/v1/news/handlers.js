const news = require('../../../db/postgres/queriesNews');
const log = require('../../../logger')(__filename);

const badRequest = { message: 'Bad request', status: 400 };

async function getNews() {
  try {
    const { rows } = await news.selectFromNews();
    return { message: 'OK', status: 200, news: rows };
  } catch (error) {
    log.error(error, 'Get news failed to handle ');
    return badRequest;
  }
}

async function addNews(obj) {
  try {
    await news.insertNewFootballNews(obj);
    return { message: 'Created new news', status: 200 };
  } catch (error) {
    log.error(error, 'Insert news failed to handle');
    return badRequest;
  }
}

async function deleteNews(id) {
  try {
    const { rowCount } = await news.deleteFootballNews(id);
    if (rowCount === 0) {
      return { status: 400, message: 'Not found. This item was deleted' };
    }
    return { message: 'News sucessfylly deleted', status: 200 };
  } catch (error) {
    log.error(error, 'Delete news failed to handle');
    return badRequest;
  }
}

async function updateNews(obj) {
  try {
    await news.updateFootballNews(obj);
    return { status: 200, message: 'News has been updated' };
  } catch (error) {
    log.error(error, 'Update news failed to handle');
    return badRequest;
  }
}

module.exports = {
  getNews,
  addNews,
  deleteNews,
  updateNews,
};
