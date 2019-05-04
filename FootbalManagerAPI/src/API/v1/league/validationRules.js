const { Rule } = require('@cesium133/forgjs');

module.exports = {
  addLeagueValidation: ({ title }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(title),
  deleteLeagueValidation: ({ id }) => new Rule({ type: 'string' }, null).test(id),
  updateLeagueValidation: ({ title }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(title),
};
