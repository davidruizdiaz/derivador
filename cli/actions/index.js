import { oraPromise } from 'ora';
import chalk from 'chalk';

const init = async () => {
  await oraPromise(startTimer, {
    text: `${chalk.blue('Iniciando...')}`,
    color: 'blue',
    successText: 'Tarea 1 completada'
  })

}

const deb = async opts => {
  await oraPromise(debug(opts), {
    text: `${chalk.blue('Iniciando...')}`,
    color: 'blue',
    successText: 'Tarea 2 completada'
  })

};

function startTimer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(chalk.red('Tarea 1 finalizada'))
      resolve(true);
    }, 4000);
  })
}

function debug(opts) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(chalk.red('Tarea 2 finalizada'))
      console.log(opts)
      resolve(true);
    }, 5000);
  })
}

export {
  init,
  deb,
}
