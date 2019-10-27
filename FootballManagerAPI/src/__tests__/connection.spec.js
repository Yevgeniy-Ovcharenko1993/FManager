const { pgConnection, redisConnection } = require('../connection');

describe('connection postgres', () => {
  it('should not connect sucess to database', async () => {
    await expect(pgConnection()).rejects.toThrow('connect ECONNREFUSED 127.0.0.1:5432');
  });

  it('should connection exist', async () => {
    await expect(pgConnection()).not.toBeNull();
  });
});

describe('connection redis', () => {
  it('should connection exist', async () => {
    await expect(redisConnection()).not.toBeNull();
  });
});
