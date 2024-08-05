import { program } from 'commander';
import { analyzeOptions } from '../options/index.js';

const progInfo = {
  appName: "asisgen",
  appDescription: "Genera la aplicación de asistencia individual o grupal dependiendo de las opciones seleccionadas.",
  appVersion: "1.0.0",
};

export const programInit = () => {
  const { appName: name, appDescription: description, appVersion: version } = progInfo;

  program
    .name(name)
    .description(description)
    .requiredOption('-t, --type <tipo>', 'Tipo de aplicación a crear. Valores posibles [inidividual|grupal]')
    .version(version)
    .action(opts => {
      if (!opts.type || (opts.type !== 'individual' && opts.type !== 'grupal')) {
        console.error('Error en las opciones, verifique las opciones con --help');
        return;
      }
      analyzeOptions(opts.type)
    });

  program.parse();
};



