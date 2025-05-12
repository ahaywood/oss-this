/**
 * oss-this - Automate adding common open source repository files
 * 
 * This module provides functions to add common open source repository files
 * to a project, such as GitHub templates, documentation, and licensing.
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Add GitHub templates to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addGitHubTemplates(destDir) {
  const templateDir = path.join(__dirname, 'templates');
  const githubDir = path.join(destDir, '.github');
  
  await fs.ensureDir(githubDir);
  
  // Copy PR template
  await fs.copy(
    path.join(templateDir, 'github', 'PULL_REQUEST_TEMPLATE.md'),
    path.join(githubDir, 'PULL_REQUEST_TEMPLATE.md')
  );
  
  // Copy issue templates
  const issueTemplateDir = path.join(githubDir, 'ISSUE_TEMPLATE');
  await fs.ensureDir(issueTemplateDir);
  
  await fs.copy(
    path.join(templateDir, 'github', 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join(issueTemplateDir, 'bug_report.md')
  );
  
  await fs.copy(
    path.join(templateDir, 'github', 'ISSUE_TEMPLATE', 'feature_request.md'),
    path.join(issueTemplateDir, 'feature_request.md')
  );
}

/**
 * Add contributing documentation to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addContributing(destDir) {
  const templateDir = path.join(__dirname, 'templates');
  
  await fs.copy(
    path.join(templateDir, 'docs', 'CONTRIBUTING.md'),
    path.join(destDir, 'CONTRIBUTING.md')
  );
  
  await fs.copy(
    path.join(templateDir, 'docs', 'CONTRIBUTORS.md'),
    path.join(destDir, 'CONTRIBUTORS.md')
  );
}

/**
 * Add code of conduct to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addCodeOfConduct(destDir) {
  const templateDir = path.join(__dirname, 'templates');
  
  await fs.copy(
    path.join(templateDir, 'docs', 'CODE_OF_CONDUCT.md'),
    path.join(destDir, 'CODE_OF_CONDUCT.md')
  );
}

/**
 * Add changelog to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addChangelog(destDir) {
  const templateDir = path.join(__dirname, 'templates');
  
  await fs.copy(
    path.join(templateDir, 'docs', 'CHANGELOG.md'),
    path.join(destDir, 'CHANGELOG.md')
  );
}

/**
 * Add license to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addLicense(destDir) {
  const templateDir = path.join(__dirname, 'templates');
  
  await fs.copy(
    path.join(templateDir, 'docs', 'LICENSE'),
    path.join(destDir, 'LICENSE')
  );
}

/**
 * Add all open source files to a repository
 * @param {string} destDir - Destination directory
 * @returns {Promise<void>}
 */
async function addAll(destDir) {
  await addGitHubTemplates(destDir);
  await addContributing(destDir);
  await addCodeOfConduct(destDir);
  await addChangelog(destDir);
  await addLicense(destDir);
}

export {
  addGitHubTemplates,
  addContributing,
  addCodeOfConduct,
  addChangelog,
  addLicense,
  addAll
};
