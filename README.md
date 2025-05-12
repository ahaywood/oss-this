# oss-this

A Node.js package to automate adding common open source repository files to your project.

## Features

- Add GitHub pull request and issue templates
- Add CONTRIBUTING.md and CONTRIBUTORS.md files
- Add CODE_OF_CONDUCT.md
- Add CHANGELOG.md with semantic versioning structure
- Add licensing information (MIT license)

## Installation

### Global Installation (Recommended)

```bash
npm install -g oss-this
```

### Local Installation

```bash
npm install oss-this --save-dev
```

## Usage

### Command Line Interface

After installing globally, you can use the `oss-this` command:

```bash
# Add all template files to the current directory
oss-this --all

# Add only GitHub templates
oss-this --github

# Add only contributing documentation
oss-this --contributing

# Add only code of conduct
oss-this --code-of-conduct

# Add only changelog
oss-this --changelog

# Add only license
oss-this --license

# Add all templates to a specific directory
oss-this --all --destination /path/to/your/project
```

### Programmatic Usage

You can also use the package programmatically in your Node.js scripts:

```javascript
const ossThis = require('oss-this');

// Add all template files
ossThis.addAll('/path/to/your/project')
  .then(() => console.log('All templates added successfully!'))
  .catch(err => console.error('Error:', err));

// Add only GitHub templates
ossThis.addGitHubTemplates('/path/to/your/project')
  .then(() => console.log('GitHub templates added successfully!'))
  .catch(err => console.error('Error:', err));

// Add only contributing documentation
ossThis.addContributing('/path/to/your/project')
  .then(() => console.log('Contributing docs added successfully!'))
  .catch(err => console.error('Error:', err));

// Add only code of conduct
ossThis.addCodeOfConduct('/path/to/your/project')
  .then(() => console.log('Code of conduct added successfully!'))
  .catch(err => console.error('Error:', err));

// Add only changelog
ossThis.addChangelog('/path/to/your/project')
  .then(() => console.log('Changelog added successfully!'))
  .catch(err => console.error('Error:', err));

// Add only license
ossThis.addLicense('/path/to/your/project')
  .then(() => console.log('License added successfully!'))
  .catch(err => console.error('Error:', err));
```

## Templates

All templates are located in the `templates` directory of the package:

- GitHub templates: PR template and issue templates (bug report, feature request)
- Documentation: CONTRIBUTING.md, CONTRIBUTORS.md, CODE_OF_CONDUCT.md, CHANGELOG.md
- License: MIT license

## Customization

After adding the templates to your project, you should customize them to fit your project's specific needs:

1. Replace `[Project Name]` with your actual project name
2. Update the license with the correct year and copyright holder
3. Customize the CONTRIBUTING.md guidelines to match your project's workflow
4. Update the CHANGELOG.md with your project's actual releases

## License

MIT
