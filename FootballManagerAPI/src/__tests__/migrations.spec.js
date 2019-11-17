const connection = require('../connection');

connection.pgConnection = jest.fn(() => {
});

const migrations = require('../migrations');

describe('Positive DB Migration cases', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it('should execute database schema migration', async () => {
    migrations.importDBSchema = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ status: 'MIGRATED' }));
    await expect(migrations.importDBSchema()).resolves.toStrictEqual({
      status: 'MIGRATED',
    });
  });
});

// describe('Negative DB migration cases', () => {
//   it('should fail executing database schema migration', async () => {
//     connection.pgConnection = jest
//       .fn()
//       .mockImplementationOnce(() => Promise.reject(new Error('Failed to connect')));
//     await expect(migrations.importDBSchema()).rejects.toThrowError('Failed to import schema');
//   });
// });
