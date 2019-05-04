const { Rule } = require('@cesium133/forgjs');

module.exports = {
  addChampLeagueValidation: ({ groupName }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(groupName),
  deleteChampLeagueValidation: ({ id }) => new Rule({ type: 'string' }, null).test(id),
  updateChampLeagueValidation: ({ groupName }) =>
    new Rule({ type: 'string', minLength: 5, maxLength: 30 }, null).test(groupName),
};
