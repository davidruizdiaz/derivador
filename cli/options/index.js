import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { runActions } from '../actions/index.js';

export const analyzeOptions = async opt => {
  if (opt === 'individual') {
    const optionsPath = join(import.meta.dirname, '/optionsIndividual.json');
    const options = await JSON.parse(await readFile(optionsPath, { encoding: 'utf8' }));
    runActions(options);
  } else if (opt === 'grupal') {
    const optionsPath = join(import.meta.dirname, '/optionsGrupal.json');
    const options = await JSON.parse(await readFile(optionsPath, { encoding: 'utf8' }));
    runActions(options);
  } else {
    throw new Error('Error inesperado');
  }
};

