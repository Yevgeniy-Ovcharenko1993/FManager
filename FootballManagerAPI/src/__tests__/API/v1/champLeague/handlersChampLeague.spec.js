jest.mock('pg');
jest.mock('../../../../db/postgres/queriesChampLeague');
jest.mock('../../../../connection');

const champLeague = require('../../../../db/postgres/queriesChampLeague');
const handlersChampLeague = require('../../../../API/v1/champLeague/handlersChampLeague');

const promiseResolved = Promise.resolve({
  rows: [
    {
      groupName: 'hello',
      games: 5,
      wins: 5,
      draws: 5,
      loses: 5,
      goals: 5,
      missed: 5,
      scoredBalls: 5,
      teamId: 5,
    },
  ],
});

champLeague.insertChampLeague = jest.fn(() => promiseResolved);
champLeague.selectFromChampLeague = jest.fn(() => promiseResolved);
champLeague.updateChampLeague = jest.fn(() => Promise.resolve({ status: 'UPDATED' }));
champLeague.deleteChampLeague = jest.fn(() => Promise.resolve({ status: 'DELETED' }));

describe('handlers champions league tests - positive', () => {
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

  it('should return OK from champLeague table after inserting data', async () => {
    const result = await handlersChampLeague.addChampLeague(data);
    expect(result).toEqual({ message: 'Created new Champ League', status: 200 });
  });

  it('should return OK of selecting data from champLeague table', async () => {
    const result = await handlersChampLeague.geChampLeague();
    expect(result).toEqual({
      message: 'OK',
      status: 200,
      champLeagues: [
        {
          groupName: 'hello',
          games: 5,
          wins: 5,
          draws: 5,
          loses: 5,
          goals: 5,
          missed: 5,
          scoredBalls: 5,
          teamId: 5,
        },
      ],
    });
  });

  it('should return OK of updating data champLeague table', async () => {
    const result = await handlersChampLeague.updateChampLeague({ league: 1 });
    expect(result).toEqual({ status: 200, message: 'ChampLeague has been updated' });
  });

  it('should return OK of deleting data from the database champLeague table', async () => {
    const result = await handlersChampLeague.deleteChampLeague(1);
    expect(result).toEqual({ message: 'ChampLeague sucessfylly deleted', status: 200 });
  });

  it('should handle an empty row array ', async () => {
    champLeague.deleteChampLeague = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ rowCount: 0 }));
    const result = await handlersChampLeague.deleteChampLeague(1);
    expect(result).toEqual({ message: 'Not found. This item was deleted', status: 400 });
  });
});

// describe('handlers champions league tests - neggative', () => {
// });
