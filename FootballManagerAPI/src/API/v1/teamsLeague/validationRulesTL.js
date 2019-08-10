const { Rule } = require('@cesium133/forgjs');

module.exports = {
  addTeamdsLeagueValidation: ({ commandName }) => new Rule({ type: 'string' }).test(commandName),
  updateTeamLeagueValidation: ({ id }) => new Rule({ type: 'int' }).test(id),
  deleteTeamLeagueValidation: ({ id }) => new Rule({ type: 'string' }).test(id),
};
