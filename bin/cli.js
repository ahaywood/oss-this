#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new command instance
const program = new Command();

// Define the version and description
program
  .version('1.0.0')
  .description('Automate adding common open source repository files');

// Define the main command
program
  .option('-a, --all', 'Add all template files')
  .option('-g, --github', 'Add GitHub templates (PR, issues, etc.)')
  .option('-c, --contributing', 'Add CONTRIBUTING.md and CONTRIBUTORS.md')
  .option('-o, --code-of-conduct', 'Add CODE_OF_CONDUCT.md')
  .option('-l, --changelog', 'Add CHANGELOG.md')
  .option('-i, --license', 'Add LICENSE file')
  .option('-d, --destination <path>', 'Destination directory', process.cwd());

// Parse arguments
program.parse(process.argv);

// Get the options
const options = program.opts();

// If no options are provided, show help
if (!process.argv.slice(2).length) {
  program.help();
}

// Set the template directory
const templateDir = path.join(__dirname, '..', 'templates');
const destDir = path.resolve(options.destination);

// Function to copy a template file
async function copyTemplate(templatePath, destPath) {
  try {
    await fs.copy(templatePath, destPath);
    console.log(chalk.green(`✓ Created ${destPath}`));
  } catch (err) {
    console.error(chalk.red(`✗ Error creating ${destPath}: ${err.message}`));
  }
}

// Main function to run the CLI
async function run() {
  console.log(chalk.blue('🚀 Setting up open source files...'));

  // Check if destination exists
  if (!fs.existsSync(destDir)) {
    console.error(chalk.red(`Destination directory ${destDir} does not exist.`));
    process.exit(1);
  }

  // Add GitHub templates
  if (options.all || options.github) {
    const githubDir = path.join(destDir, '.github');
    await fs.ensureDir(githubDir);
    
    // Copy PR template
    await copyTemplate(
      path.join(templateDir, 'github', 'PULL_REQUEST_TEMPLATE.md'),
      path.join(githubDir, 'PULL_REQUEST_TEMPLATE.md')
    );
    
    // Copy issue templates
    const issueTemplateDir = path.join(githubDir, 'ISSUE_TEMPLATE');
    await fs.ensureDir(issueTemplateDir);
    
    await copyTemplate(
      path.join(templateDir, 'github', 'ISSUE_TEMPLATE', 'bug_report.md'),
      path.join(issueTemplateDir, 'bug_report.md')
    );
    
    await copyTemplate(
      path.join(templateDir, 'github', 'ISSUE_TEMPLATE', 'feature_request.md'),
      path.join(issueTemplateDir, 'feature_request.md')
    );
  }

  // Add CONTRIBUTING.md and CONTRIBUTORS.md
  if (options.all || options.contributing) {
    await copyTemplate(
      path.join(templateDir, 'docs', 'CONTRIBUTING.md'),
      path.join(destDir, 'CONTRIBUTING.md')
    );
    
    await copyTemplate(
      path.join(templateDir, 'docs', 'CONTRIBUTORS.md'),
      path.join(destDir, 'CONTRIBUTORS.md')
    );
  }

  // Add CODE_OF_CONDUCT.md
  if (options.all || options.codeOfConduct) {
    await copyTemplate(
      path.join(templateDir, 'docs', 'CODE_OF_CONDUCT.md'),
      path.join(destDir, 'CODE_OF_CONDUCT.md')
    );
  }

  // Add CHANGELOG.md
  if (options.all || options.changelog) {
    await copyTemplate(
      path.join(templateDir, 'docs', 'CHANGELOG.md'),
      path.join(destDir, 'CHANGELOG.md')
    );
  }

  // Add LICENSE
  if (options.all || options.license) {
    await copyTemplate(
      path.join(templateDir, 'docs', 'LICENSE'),
      path.join(destDir, 'LICENSE')
    );
  }

  console.log(chalk.green('✨ All done! Your repository is now more open-source friendly.'));
}

// Run the CLI
run().catch(err => {
  console.error(chalk.red('Error:', err.message));
  process.exit(1);
});
