const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[hash].[name].js',
    // 自动清空上次打包，以前需要clean插件
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        // 处理文件
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 4kb
          }
        },
        generator: {
          filename: 'static/images/[hash][ext][query]'
        }
      },
      {
        // 处理字体, asset/resource想当于file-loader
        test: /\.ttf|eot|woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      },
      {
        // 处理视频文件, asset/resource想当于file-loader
        test: /\.mp3|mp4|avi$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/resource/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts', 'jsx', 'tsx'],
      context: path.join(__dirname, '../src'),
      exclude: ['node_modules'],
      cache: true
    }),
    new HtmlWebpackPlugin({
      title: 'Ticken',
      template: './public/index.html',
      publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: '[name]-[chunk].css'
    }),
    new Dotenv(),
    new NodePolyfillPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', 'json'],
    // 设置别名
    alias: {
      '@': resolve('../src')
    },
    fallback: {
      net: false,
      tls: false,
      fs: false,
      browser: false
    }
  }
};
