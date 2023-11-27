module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './assets',
            '@modules/app': './modules/app',
            '@modules/common': './modules/common',
            '@modules/core': './modules/core',
            '@modules/auth': './modules/auth',
          },
        },
      ],
      '@babel/plugin-proposal-class-properties',
      'react-native-reanimated/plugin',
    ],
    assumptions: {
      setPublicClassFields: false,
    },
  };
};