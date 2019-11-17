jest.mock('pg');
jest.mock('../../db/postgres/queriesChampLeague');
jest.mock('../../connection', () => ({}));

const champLeague = require('../../db/postgres/queriesChampLeague');

champLeague.insertChampLeague = jest.fn(() => Promise.resolve({ status: 'INSERTED' }));
champLeague.selectFromChampLeague = jest.fn(() => Promise.resolve({ status: 'SELECTED' }));
champLeague.updateChampLeague = jest.fn(() => Promise.resolve({ status: 'UPDATED' }));
champLeague.deleteChampLeague = jest.fn(() => Promise.resolve({ status: 'DELETED' }));

describe('queries champions league tests', () => {
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

  it('should write data into the database champLeague table', async () => {
    await expect(champLeague.insertChampLeague(data)).resolves.toStrictEqual({
      status: 'INSERTED',
    });
  });

  it('should select data from champLeague table', async () => {
    await expect(champLeague.selectFromChampLeague()).resolves.toStrictEqual({
      status: 'SELECTED',
    });
  });

  it('should write data into the database champLeague table', async () => {
    await expect(champLeague.updateChampLeague(data)).resolves.toStrictEqual({ status: 'UPDATED' });
  });

  it('should write data into the database champLeague table', async () => {
    await expect(champLeague.deleteChampLeague(data)).resolves.toStrictEqual({ status: 'DELETED' });
  });
});
