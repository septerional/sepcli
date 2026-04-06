import chalk from 'chalk';
import { createInterface } from 'readline';
import { setApiKey } from '../lib/config.js';
import { printLogo } from '../lib/logo.js';

async function prompt(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export default async function initCommand() {
  const gold = chalk.hex('#F7C873');

  printLogo();
  console.log(gold.bold('🚀 Septerional Sep CLI - Initialize\n'));
  console.log('To get your API key:');
  console.log(gold('1. Visit https://console.septerional.com'));
  console.log(gold('2. Go to Settings > API Keys'));
  console.log(gold('3. Create a new API key\n'));

  const apiKey = await prompt(gold('? Enter your API key: '));

  if (!apiKey || apiKey.trim() === '') {
    console.log(chalk.red('✗ API key is required'));
    process.exit(1);
  }

  if (!apiKey.startsWith('sk_live_')) {
    console.log(chalk.red('✗ Invalid API key format. It should start with "sk_live_"'));
    process.exit(1);
  }

  setApiKey(apiKey.trim());

  console.log(chalk.green('\n✓ API key saved successfully!'));
  console.log(chalk.dim('You can now use commands like:'));
  console.log(chalk.dim('  sep create "My First Cogit"'));
  console.log(chalk.dim('  sep list'));
  console.log(chalk.dim('  sep search "javascript"\n'));
}
