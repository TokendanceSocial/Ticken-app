const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
module.exports = merge(common, {
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,  
  },
  devtool: 'eval-cheap-module-source-map',
  mode: 'development'
})