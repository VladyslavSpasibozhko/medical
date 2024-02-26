'use strict';

module.exports = {
  static: {
    port: 8000,
  },
  api: {
    port: 8001,
    transport: 'http',
  },
  sandbox: {
    timeout: 5000,
    displayErrors: false,
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'medical',
    user: 'root',
    password: 'root',
  },
  pg: {
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
  },
};
