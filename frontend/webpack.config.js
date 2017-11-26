const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://localhost:9000'),
};

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    modules: [
      path.join(__dirname, './src'),
      'node_modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('main.css'),
    new webpack.ProvidePlugin({
      THREE: 'three',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        query: {
          presets: ['flow', 'react', 'es2016', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader' }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }),
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
  },
  devtool: 'cheap-module-eval-source-map',
};
