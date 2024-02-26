'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const pg = require('pg');
const config = require('./config.js');
const compileSchema = require('./lib/compileSchema.js');

const DB = path.join(process.cwd(), './db');
const SCHEMAS = path.join(process.cwd(), './schemas');

const read = (name) => fsp.readFile(path.join(DB, name), 'utf8');
const notEmpty = (s) => s.trim() !== '';

const execute = async (client, sql) => {
  try {
    await client.query(sql);
  } catch (err) {
    console.error(err);
  }
};

const executeFile = async (client, name) => {
  console.log(`Execute file: ${name}`);
  const sql = await read(name);
  const commands = sql.split(';\n').filter(notEmpty);
  for (const command of commands) {
    await execute(client, command);
  }
};

const buildTypes = async () => {
  const files = await fsp.readdir(SCHEMAS);
  const types = [];

  for await (const file of files) {
    const type = await compileSchema(path.join(SCHEMAS, file));
    types.push(type);
  }

  await fsp.writeFile(path.join(DB, 'domain.d.ts'), types.join('; '), {
    encoding: 'utf-8',
  });
};

(async () => {
  await buildTypes();

  const inst = new pg.Client({ ...config.db, ...config.pg });
  await inst.connect();
  await executeFile(inst, 'install.sql');
  await inst.end();
  const db = new pg.Client(config.db);
  await db.connect();
  await executeFile(db, 'structure.sql');
  await executeFile(db, 'data.sql');
  await db.end();
  console.log('Environment is ready');
})().catch((err) => {
  console.error(err);
});
