const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfig = env => require(`./build-config/webpack.${env.mode}.config.js`)(env);

const outputPath = path.resolve(__dirname, 'dist');

module.exports = ({ mode = 'production' } = {}) => {
  return webpackMerge(
    {
      mode,
      entry: './src',
      output: {
        path: outputPath,
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
      },
      plugins: [
        new CleanWebpackPlugin({
          verbose: true
        }),
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
      ]
    },
    modeConfig({ mode })
  );
};
