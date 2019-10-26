jest.mock('pg');
jest.mock('../../db/postgres/queriesChampLeague');
jest.mock('../../connection');

const champLeague = require('../../db/postgres/queriesChampLeague');

champLeague.insertChampLeague = jest.fn(() => 'test function');
// champLeague.selectFromChampLeague = jest.fn(() => 'test function');
// champLeague.updateChampLeague = jest.fn(() => 'test function');
// champLeague.deleteChampLeague = jest.fn(() => {
//   const res = { hello: 'hello' };
//   return res;
// });

// champLeague.insertChampLeague = jest.fn();

describe('queries champions league tests', () => {
  // beforeEach(() => {
  //   //do something
  // })
  // afterAll(() => {
  //   //do something

  it('should write data into the database champLeague table', async () => {
    const data = {
      groupName: 'hello',
      games: 5,
      wins: 5,
      draws: 5,
      loses: 5,
      goals: 5,
      missed: 5,
      scoredBalls: 5,
      teamId: 5,
    };
    expect(champLeague.insertChampLeague(data)).toEqual('test function');
  });
});
