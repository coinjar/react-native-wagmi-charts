const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const root = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);

// babel.config.js aliases the library to its source in the repo root, so Metro
// has to watch outside the example directory to pick up library edits.
config.watchFolders = [root];

module.exports = config;
