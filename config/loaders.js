
const { ASSETS_PATH } = require('./paths');

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2,
    camelCase: true,
    localIdentName: '[folder]__[local]___[hash:base64:5]',
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    outputStyle: 'expanded',
    data: '@import "variables";',
    includePaths: `${ASSETS_PATH}/styles`,
  },
};

module.exports = {
  cssLoader,
  sassLoader,
};
