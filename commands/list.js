import chalk from 'chalk';
import ora from 'ora';
import api from '../lib/api.js';
import { hasConfig } from '../lib/config.js';

export default async function listCommand(options) {
  if (!hasConfig()) {
    console.log(chalk.red('\n✗ Not authenticated. Run "sep init" first.\n'));
    process.exit(1);
  }

  const spinner = ora('Fetching your Cogits...').start();

  try {
    const limit = parseInt(options.limit) || 10;
    const result = await api.listCogits({ limit });

    spinner.stop();

    if (!result.cogits || result.cogits.length === 0) {
      console.log(chalk.yellow('\n📭 No Cogits found. Create one with "sep create <title>"\n'));
      return;
    }

    console.log(chalk.bold(`\n📚 Your Cogits (${result.cogits.length}):\n`));

    result.cogits.forEach((cogit, index) => {
      console.log(chalk.cyan(`${index + 1}. ${cogit.title}`));
      console.log(chalk.dim(`   ${cogit.slug}`));
      if (cogit.description) {
        console.log(chalk.dim(`   ${cogit.description.substring(0, 60)}${cogit.description.length > 60 ? '...' : ''}`));
      }
      if (cogit.tags && cogit.tags.length > 0) {
        console.log(chalk.dim(`   Tags: ${cogit.tags.join(', ')}`));
      }
      console.log(chalk.dim(`   Created: ${new Date(cogit.created_at).toLocaleDateString()}`));
      console.log();
    });

    if (result.cogits.length >= limit) {
      console.log(chalk.dim(`Showing first ${limit} results. Use --limit to see more.\n`));
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch Cogits'));

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
