const packageJson = require('./package.json');

const config = packageJson.eslintConfig.rules['prettier/prettier'][1];

module.exports = config;
