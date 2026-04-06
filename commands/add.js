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
    console.log(chalk.yellow('Usage: sep add <type> "content" --cogit <cogit-id-or-slug>'));
    console.log(chalk.dim('Example: sep add progress "Update" --cogit ideas-para-mejorar-cli\n'));
    process.exit(1);
  }

  const spinner = ora('Adding entry...').start();

  try {
    let cogitId = options.cogit;

    // If cogit is not a number, assume it's a slug and find the cogit first
    if (isNaN(cogitId)) {
      spinner.text = 'Finding cogit by slug...';
      try {
        const cogits = await api.listCogits({ limit: 100 });
        const foundCogit = cogits.cogits.find(c => c.slug === cogitId);

        if (!foundCogit) {
          spinner.fail(chalk.red('Cogit not found'));
          console.log(chalk.yellow(`\nCouldn't find a cogit with slug: ${cogitId}`));
          console.log(chalk.dim('Try using the cogit ID instead, or check the slug with "sep list"\n'));
          process.exit(1);
        }

        cogitId = foundCogit.id;
        spinner.text = 'Adding entry...';
      } catch (error) {
        spinner.fail(chalk.red('Failed to find cogit'));
        console.log(chalk.red(`\nError: ${error.message}\n`));
        process.exit(1);
      }
    }

    const data = {
      entry_type: entryType,
      content: content,
    };

    const result = await api.addEntry(cogitId, data);

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
