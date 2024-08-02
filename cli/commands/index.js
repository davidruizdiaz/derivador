import { Command } from 'commander';
import { deb } from '../actions/index.js';

export const programInit = opts => {
  const { appName: name, appDescription: description, appVersion: version } = opts;
  const program = new Command();
  program
    .name(name)
    .description(description)
    .version(version)


  program
    .option('-t, --text <string>, Texto de prueba')
    .option('-b, --bool, Opción booleana de ejemplo');

  program
    .command('test')
    .description('Inicia la prueba')
    .action(setOpts);


  function setOpts() {
    deb(program.opts());
  }

  program.parse();

};



