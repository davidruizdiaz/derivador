import { cpSync, mkdirSync, existsSync, lstatSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import ora from 'ora';
import chalk from 'chalk';

const snip = ora(chalk.yellow('Creando carpetas'));

const getDistPath = appName => resolve(`./dist/${appName}`);
const getSharedPath = () => resolve('./coreAssets/shared');
const getNoSharedPath = () => resolve('./coreAssets/notShared');

function createFolders({ appName, notShared, variables }) {
  snip.start();
  snip.color = 'red';
  try {
    createBase(appName);
    createShared(appName);
    createNotShared(appName, notShared);
    createVariables(appName, variables);
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear la estructura de archivos'));
    console.error(error);
  }
}

async function createVariables(appName, variables) {
  try {
    snip.info(chalk.greenBright(`Iniciando creación de recursos variable en dist/${appName}`));
    for (const v of variables) {
      const fileName = v.assetName.split('/').pop().split('.').shift().concat(v.fileExt);
      const module = await import(`../../coreAssets/variables${v.assetName}`);
      const fileContent = module.genResource(v.variabilityPoints);
      const filePath = resolve(`${getDistPath(appName)}${v.destinyPath}/${fileName}`);
      writeFileSync(filePath, fileContent, { encoding: 'utf8' });
      snip.succeed(chalk.greenBright(`${fileName} creado correctamente!`));
    }
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al construir recursos variables'));
    console.error(error);
  }
}

function createNotShared(appName, notShared) {
  try {
    snip.info(chalk.greenBright(`Iniciando copia de recursos no comunes en dist/${appName}`));
    for (const asset of notShared) {
      const origin = resolve(`${getNoSharedPath()}${asset.assetName}`)
      const destiny = resolve(`${getDistPath(appName)}${asset.destinyPath}`)
      const isFile = lstatSync(origin).isFile();
      if (!existsSync(destiny)) {
        mkdirSync(destiny, { recursive: true })
      }
      if (isFile) {
        const fileDestiny = resolve(`${destiny}/${basename(origin)}`);
        cpSync(origin, fileDestiny, { recursive: true });
        snip.succeed(chalk.greenBright(`./coreAssets/notShared${asset.assetName} copiado correctamente`));
      } else {
        cpSync(origin, destiny, { recursive: true });
        snip.succeed(chalk.greenBright(`./coreAssets/notShared${asset.assetName} copiado correctamente`));
      }
    }
    snip.succeed(chalk.bgGreenBright.blackBright('Copia de recursos no comunes concluido correctamente'));
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear recursos no comunes'));
    console.error(error);
  }
}

function createShared(appName) {
  try {
    snip.info(chalk.greenBright(`Iniciando copia de recursos comunes en dist/${appName}`));
    const origin = getSharedPath();
    const destiny = getDistPath(appName);
    cpSync(origin, destiny, { recursive: true });
    snip.succeed(chalk.bgGreenBright.blackBright('Copia de recursos comunes concluido correctamente'));
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear recursos comunes'));
    console.error(error);
  }
}

function createBase(appName) {
  try {
    snip.info(chalk.greenBright(`Iniciando Creanción de la estructura base en dist/${appName}`));
    if (existsSync(getDistPath(appName))) {
      snip.info(chalk.bgGreenBright.blackBright(`La estructura base /dist/${appName} ya está creada`));
    } else {
      mkdirSync(getDistPath(appName), { recursive: true });
      snip.succeed(chalk.bgGreenBright.blackBright(`Estructura base creada correctamente`));
    }
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear la estructura base'));
    console.error(error);
  }
}


export {
  createFolders,
}
