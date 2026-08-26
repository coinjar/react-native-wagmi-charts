const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const root = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);
config.watchFolders = [root];

module.exports = config;
