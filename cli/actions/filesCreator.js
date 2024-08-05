import { cpSync, mkdirSync, existsSync, lstatSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import ora from 'ora';
import chalk from 'chalk';

const snip = ora(chalk.yellow('Creando carpetas'));

function createFolders({ appName, notShared }) {
  snip.start();
  snip.color = 'red';
  try {
    createBase(appName);
    createShared(appName);
    createNotShared(appName, notShared);
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear la estructura de archivos'));
    console.error(error);
  }
}

function createNotShared(appName, notShared) {
  try {
    snip.text = `Copiando archivos no comunes en dist/${appName}`
    const originBase = resolve('./coreAssets/notShared')
    const destinyBase = resolve(`./dist/${appName}`);
    for (const asset of notShared) {
      const origin = resolve(`${originBase}${asset.assetName}`)
      const destiny = resolve(`${destinyBase}${asset.destinyPath}`)
      const isFile = lstatSync(origin).isFile();
      if (!existsSync(destiny)) {
        mkdirSync(destiny, { recursive: true })
      }
      if (isFile) {
        const fileDestiny = resolve(`${destiny}/${basename(origin)}`);
        cpSync(origin, fileDestiny, { recursive: true });
        snip.info(chalk.greenBright(`'./coreAssets/notShared'${asset.assetName} copiado a ${fileDestiny}`));
      } else {
        cpSync(origin, destiny, { recursive: true });
        snip.info(chalk.greenBright(`'./coreAssets/notShared'${asset.assetName} copiado a ${destiny}`));
      }
    }
    snip.succeed(chalk.bgGreenBright.blackBright('Copia de archivos no comunes concluido correctamente'));
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear recursos no comunes'));
    console.error(error);
  }
}

function createShared(appName) {
  try {
    snip.text = `Copiando archivos comunes en dist/${appName}`
    const origin = resolve('./coreAssets/shared')
    const destiny = resolve(`./dist/${appName}`);
    cpSync(origin, destiny, { recursive: true });
    snip.succeed(chalk.bgGreenBright.blackBright('Copia de archivos comunes concluido correctamente'));
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear recursos comunes'));
    console.error(error);
  }
}

function createBase(appName) {
  try {
    snip.text = `Creando estructura base dist/${appName}`
    if (existsSync(resolve('./dist/' + appName))) {
      snip.info(chalk.green(`La estructura base /dist/${appName} ya está creada`));
    } else {
      mkdirSync(resolve(`./dist/${appName}`), { recursive: true });
      snip.succeed(chalk.green(`Estructura base /dist/${appName} creada correctamente`));
    }
  } catch (error) {
    snip.fail(chalk.bgRedBright.blackBright('Ocurrió un error al crear la estructura base'));
    console.error(error);
  }
}



export {
  createFolders,
}
