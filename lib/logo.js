import chalk from 'chalk';

const eyeColor = chalk.hex('#F7C873');
const faceColor = chalk.white;

export function printLogo() {
  console.log('');
  console.log(faceColor('     ==============================     '));
  console.log(faceColor('  ==') + faceColor('--------------------------------') + faceColor('==  '));
  console.log(faceColor(' =') + faceColor('------------------------------------') + faceColor('= '));
  console.log(faceColor('=-------') + eyeColor('####') + faceColor('----------------') + eyeColor('####') + faceColor('-------='));
  console.log(faceColor('-------') + eyeColor('######') + faceColor('*------------') + eyeColor('#######') + faceColor('-------'));
  console.log(faceColor('-------') + eyeColor('######') + faceColor('*------------*') + eyeColor('######') + faceColor('-------'));
  console.log(faceColor('--------') + eyeColor('####') + faceColor('----------------') + eyeColor('####') + faceColor('--------'));
  console.log(faceColor(' -------------------------------------- '));
  console.log(faceColor('  ------------------------------------  '));
  console.log(faceColor('     ------------------------------     '));
  console.log('');
}
