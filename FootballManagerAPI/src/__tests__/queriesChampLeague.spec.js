jest.mock('pg');
jest.mock('../db/postgres/queriesChampLeague');
jest.mock('../connection');

const champLeague = require('../db/postgres/queriesChampLeague');

champLeague.insertChampLeague = jest.fn(() => 'test function');

describe('queries champions league tests', () => {
  // beforeEach(() => {
  //   //do something
  // })
  // afterAll(() => {
  //   //do something

  test('should write data into the database', async () => {
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
    const result = await champLeague.insertChampLeague(data);
    expect(result).toEqual('test function');
  });
});
