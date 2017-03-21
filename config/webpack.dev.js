const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const {
  APP_PATH,
  NODE_MODULES_PATH,
} = require('./paths');

const DEVELOPMENT_CONFIG = {
  entry: {
    app: [
      'react-hot-loader/patch',
      APP_PATH,
    ],
  },

  cache: true,

  devServer: {
    hot: true,
    port: 3000,
    inline: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
      assets: true,
      timings: true,
      chunks: false,
      children: false,
    },
  },

  output: {
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new htmlWebpackPlugin({                   // eslint-disable-line
      template: `${APP_PATH}/index.html`,
    }),
    new WatchMissingNodeModulesPlugin(NODE_MODULES_PATH),
  ],
};

module.exports = DEVELOPMENT_CONFIG;
