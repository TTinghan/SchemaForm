const path = require('path');

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: {
      'Vue': 'Vue',
      // 'element-ui':'ElementUI'
    }
  }
};