/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
'use strict';
const fsp = require('fs').promises;
const path = require('path');

const read = async (file) => fsp.readFile(file, { encoding: 'utf-8' });

const readRef = async (root, id) => {
  const refFile = await read(path.join(root, id));
  if (!refFile) throw Error(`There is no such file ${id}`);
  return parse(refFile);
};

const fieldFactory = (name, value, options) => {
  const { type, required = [] } = value;
  const { cwd } = options;

  const factories = {
    string: () => [name, type, { required: required.includes(name) }],
    number: () => [name, type, { required: required.includes(name) }],
    integer: () => [name, 'number', { required: required.includes(name) }],
    boolean: () => [name, type, { required: required.includes(name) }],
    array: async () => {
      const { items } = value;

      const meta = {
        required: required.includes(name),
        array: true,
      };

      if (items.$ref) {
        const schema = await readRef(cwd, items.$ref);
        if (!schema.title) {
          throw Error(`Schema ${items.$ref} does not have title`);
        }
        return [name, schema.title, meta];
      }

      const [key, type] = await fieldFactory(name, items, options);
      return [key, type, meta];
    },
    object: async () => {
      const { properties, required = [] } = value;
      const rows = [];

      for await (const entries of Object.entries(properties)) {
        const [entryKey, entryValue] = entries;

        const meta = {
          required: required.includes(entryKey),
        };

        if (entryValue.$ref) {
          const schema = await readRef(cwd, entryValue.$ref);
          if (!schema.title) {
            throw Error(`Schema ${entryValue.$ref} does not have title`);
          }
          rows.push([entryKey, schema.title, meta]);
          continue;
        }

        const [name, type] = await fieldFactory(entryKey, entryValue, options);
        rows.push([name, type, meta]);
      }

      return [name, rows];
    },
  };
  return factories[type]();
};

const parse = (file) => {
  try {
    return JSON.parse(file);
  } catch (err) {
    return {};
  }
};

const parseSchema = async (schema, options) => {
  const [title, rows] = await fieldFactory(schema.title, schema, options);
  return { title, rows };
};

const buildObject = (name, type, meta) => {
  const { array, required } = meta;

  const row = [];

  row.push(name);
  if (!required) row.push('?');
  row.push(':');
  if (array) row.push('Array<');

  if (Array.isArray(type)) {
    row.push('{');
    const result = type.map((data) => buildObject(...data));
    row.push(result.join(''));
    row.push('}');
  } else {
    row.push(type);
  }

  if (array) row.push('>');
  row.push(';');

  return row.join('');
};

const build = ({ title, rows }) => {
  const content = ['type', title, '=', '{'];

  for (const [name, type, meta] of rows) {
    content.push(buildObject(name, type, meta));
  }

  content.push('}');
  return content.join(' ');
};

module.exports = async (path, options = { cwd: process.cwd() }) => {
  const file = await read(path);
  const fileObj = parse(file);
  const schema = await parseSchema(fileObj, options);

  return build(schema);
};
