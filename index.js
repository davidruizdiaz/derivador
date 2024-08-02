import { init } from './cli/actions/index.js';
import { programInit } from './cli/commands/index.js';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const getOpts = async () => {
  const dataJson = await fs.readFile(path.resolve('./options.json'), { 'encoding': 'utf8' });
  return await JSON.parse(dataJson);
};

init();
programInit(await getOpts());
