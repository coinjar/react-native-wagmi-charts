const path = require('path');
const pkg = require('../package.json');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            [pkg.name]: path.join(__dirname, '..', pkg.source),
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
