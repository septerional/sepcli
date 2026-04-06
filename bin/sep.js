#!/usr/bin/env node

import { program } from 'commander';
import initCommand from '../commands/init.js';
import createCommand from '../commands/create.js';
import listCommand from '../commands/list.js';
import searchCommand from '../commands/search.js';
import addCommand from '../commands/add.js';
import { printLogo } from '../lib/logo.js';

// Show logo if no arguments or just --help
if (process.argv.length === 2 || process.argv.includes('--help') || process.argv.includes('-h')) {
  printLogo();
}

program
  .name('sep')
  .description('Septerional Sep CLI - Manage your Cogits from the terminal')
  .version('0.1.0');

// Commands
program
  .command('init')
  .description('Authenticate with your API key')
  .action(initCommand);

program
  .command('create <title>')
  .description('Create a new Cogit')
  .option('-d, --description <description>', 'Cogit description')
  .option('-t, --tags <tags>', 'Comma-separated tags')
  .option('--private', 'Make the Cogit private')
  .action(createCommand);

program
  .command('list')
  .description('List your Cogits')
  .option('-l, --limit <number>', 'Number of Cogits to show', '10')
  .action(listCommand);

program
  .command('search <query>')
  .description('Search for Cogits')
  .action(searchCommand);

program
  .command('add <type> <content>')
  .description('Add an entry to a Cogit (types: progress, question, synthesis, adjustment, resource)')
  .option('-c, --cogit <cogit-id>', 'Cogit ID or slug to add entry to')
  .action(addCommand);

program.parse();
