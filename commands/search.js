import chalk from 'chalk';
import ora from 'ora';
import api from '../lib/api.js';
import { hasConfig } from '../lib/config.js';

export default async function searchCommand(query) {
  const gold = chalk.hex('#F7C873');

  if (!hasConfig()) {
    console.log(chalk.red('\n✗ Not authenticated. Run "sep init" first.\n'));
    process.exit(1);
  }

  const spinner = ora(`Searching for "${query}"...`).start();

  try {
    const result = await api.search(query);

    spinner.stop();

    // Combine cogits and entries
    const allResults = [
      ...(result.results.cogits || []),
      ...(result.results.entries || [])
    ];

    if (allResults.length === 0) {
      console.log(chalk.yellow(`\n🔍 No results found for "${query}"\n`));
      return;
    }

    console.log(gold.bold(`\n🔍 Search Results for "${query}" (${allResults.length}):\n`));

    allResults.forEach((item, index) => {
      const isEntry = item.type === 'entry';
      const data = isEntry ? item.entry : item.cogit;

      console.log(gold(`${index + 1}. ${data.title}`));
      console.log(chalk.dim(`   Type: ${item.type}`));

      if (data.user) {
        console.log(chalk.dim(`   By: @${data.user.username}`));
      }

      if (item.highlight) {
        console.log(chalk.dim(`   ${item.highlight.substring(0, 80)}${item.highlight.length > 80 ? '...' : ''}`));
      }

      if (data.tags && data.tags.length > 0) {
        console.log(chalk.dim(`   Tags: ${data.tags.join(', ')}`));
      }

      if (item.relevance) {
        console.log(chalk.dim(`   Relevance: ${item.relevance.toFixed(2)}`));
      }

      console.log();
    });
  } catch (error) {
    spinner.fail(chalk.red('Search failed'));

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
