const babelJest = require('babel-jest');

module.exports = {
  process: (src, filename) => babelJest.process(src, filename)
      .replace(/^(require|import).*\.(scss|css).*;$/gm, ''),
};
