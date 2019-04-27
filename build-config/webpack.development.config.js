const webpack = require('webpack');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 9200,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
