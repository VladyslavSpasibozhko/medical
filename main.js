'use strict';

const staticServer = require('./lib/static.js');
const logger = require('./lib/logger.js');
const common = require('./lib/common.js');
const config = require('./config.js');
const path = require('node:path');
const fsp = require('node:fs').promises;
const load = require('./lib/load.js')(config.sandbox);
const db = require('./lib/db.js')(config.db);
const transport = require(`./transport/${config.api.transport}.js`);

const sandbox = {
  api: Object.freeze({}),
  db: Object.freeze(db),
  console: Object.freeze(logger),
  common: Object.freeze(common),
};

const apiPath = path.join(process.cwd(), './api');
const routing = {};

const loadFiles = async (dir) => {
  const files = await fsp.readdir(dir);

  const paths = [];

  for await (const fileName of files) {
    const stats = await fsp.stat(path.join(dir, fileName));
    if (stats.isDirectory()) {
      const files = await loadFiles(path.join(dir, fileName));
      paths.push(...files);
    }

    if (!fileName.endsWith('.js')) continue;
    if (fileName.endsWith('.d.js')) continue;
    paths.push(path.join(dir, fileName));
  }

  return paths;
};

(async () => {
  const files = await loadFiles(apiPath);

  for (const filePath of files) {
    const serviceName = path.basename(filePath, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer('./static', config.static.port, logger);
  transport(routing, config.api.port, logger);
})();
