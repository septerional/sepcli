import chalk from 'chalk';
import ora from 'ora';
import api from '../lib/api.js';
import { hasConfig } from '../lib/config.js';

const VALID_ENTRY_TYPES = ['progress', 'question', 'synthesis', 'adjustment', 'resource'];

export default async function addCommand(entryType, content, options) {
  const gold = chalk.hex('#F7C873');

  if (!hasConfig()) {
    console.log(chalk.red('\n✗ Not authenticated. Run "sep init" first.\n'));
    process.exit(1);
  }

  // Validate entry type
  if (!VALID_ENTRY_TYPES.includes(entryType)) {
    console.log(chalk.red(`\n✗ Invalid entry type: ${entryType}`));
    console.log(chalk.yellow(`Valid types: ${VALID_ENTRY_TYPES.join(', ')}\n`));
    process.exit(1);
  }

  // Require cogit option
  if (!options.cogit) {
    console.log(chalk.red('\n✗ --cogit option is required'));
    console.log(chalk.yellow('Usage: sep add <type> "content" --cogit <cogit-id>\n'));
    process.exit(1);
  }

  const spinner = ora('Adding entry...').start();

  try {
    const data = {
      entry_type: entryType,
      content: content,
    };

    const result = await api.addEntry(options.cogit, data);

    spinner.succeed(chalk.green('Entry added successfully!'));

    console.log(gold.bold(`\n📝 Entry Details:`));
    console.log(gold(`  Type: ${result.entry.entry_type}`));
    console.log(chalk.dim(`  Content: ${result.entry.content.substring(0, 100)}${result.entry.content.length > 100 ? '...' : ''}`));
    console.log(chalk.dim(`  Created: ${new Date(result.entry.created_at).toLocaleString()}`));
    console.log();
  } catch (error) {
    spinner.fail(chalk.red('Failed to add entry'));

    if (error.response) {
      console.log(chalk.red(`\nError: ${error.response.data.message || error.response.data.error}`));
      if (error.response.status === 401) {
        console.log(chalk.yellow('Your API key may be invalid. Run "sep init" to update it.\n'));
      } else if (error.response.status === 404) {
        console.log(chalk.yellow('Cogit not found. Check the cogit ID.\n'));
      }
    } else {
      console.log(chalk.red(`\nError: ${error.message}\n`));
    }
    process.exit(1);
  }
}
