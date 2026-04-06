import chalk from 'chalk';
import ora from 'ora';
import api from '../lib/api.js';
import { hasConfig } from '../lib/config.js';

export default async function createCommand(title, options) {
  const gold = chalk.hex('#F7C873');

  if (!hasConfig()) {
    console.log(chalk.red('\n✗ Not authenticated. Run "sep init" first.\n'));
    process.exit(1);
  }

  const spinner = ora('Creating Cogit...').start();

  try {
    const data = {
      title,
      description: options.description || '',
      tags: options.tags ? options.tags.split(',').map(t => t.trim()) : [],
      is_public: !options.private,
    };

    const result = await api.createCogit(data);

    spinner.succeed(chalk.green('Cogit created successfully!'));

    console.log(gold.bold('\n📝 Cogit Details:'));
    console.log(gold(`  Title: ${result.cogit.title}`));
    console.log(chalk.dim(`  Slug: ${result.cogit.slug}`));
    if (result.cogit.description) {
      console.log(chalk.dim(`  Description: ${result.cogit.description}`));
    }
    if (result.cogit.tags && result.cogit.tags.length > 0) {
      console.log(chalk.dim(`  Tags: ${result.cogit.tags.join(', ')}`));
    }
    console.log(chalk.dim(`  Visibility: ${result.cogit.is_public ? 'Public' : 'Private'}`));
    console.log();
  } catch (error) {
    spinner.fail(chalk.red('Failed to create Cogit'));

    if (error.response) {
      console.log(chalk.red(`\nError: ${error.response.data.message || error.response.data.error}`));
      if (error.response.status === 401) {
        console.log(chalk.yellow('Your API key may be invalid. Run "sep init" to update it.\n'));
      }
    } else {
      console.log(chalk.red(`\nError: ${error.message}\n`));
    }
    process.exit(1);
  }
}
