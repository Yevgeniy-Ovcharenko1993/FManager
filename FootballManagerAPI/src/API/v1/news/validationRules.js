const { Rule } = require('@cesium133/forgjs');

module.exports = {
  addNewsValidation: ({ title }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(title),
  deleteNewsValidation: ({ id }) => new Rule({ type: 'string' }, null).test(id),
  updateNewsValidation: ({ title }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(title),
};
