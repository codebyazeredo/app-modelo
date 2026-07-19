const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  '@core': path.resolve(__dirname, 'core'),
  '@modules': path.resolve(__dirname, 'modules'),
  '@config': path.resolve(__dirname, 'config'),
  '@assets': path.resolve(__dirname, 'assets'),
};

module.exports = config;
