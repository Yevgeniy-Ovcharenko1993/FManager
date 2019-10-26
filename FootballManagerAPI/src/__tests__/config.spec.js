const config = require('../config');

describe('config', () => {
  it('postgres config should exist', () => {
    expect(config.POSTGRES_CONFIG).not.toBeNull();
  });

  it('redis config should exist', () => {
    expect(config.REDIS_CONFIG).not.toBeNull();
  });

  it('should validate connection options', () => {
    const postgres = config.POSTGRES_CONFIG;
    expect(postgres).toMatchObject({
      user: 'postgres',
      host: 'localhost' || 'postgres',
      database: 'footbalmanaginginfo',
      password: 'postgresWrong',
      port: '5432',
    });
  });

  it('should fail validation connection options', () => {
    const postgres = config.POSTGRES_CONFIG;
    expect(postgres).not.toMatchObject({
      user: '43',
      host: '4' || '43t5',
      database: '43',
      password: '123',
      port: '5432',
    });
  });
});
