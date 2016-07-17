var webpack = require('webpack');
var path = require('path');

var NODE_MODULE_PATH = path.resolve(__dirname, 'node_modules');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    html: APP_DIR + '/index.html',
    javascript: APP_DIR + '/index.js',
    css: APP_DIR + '/styles.css'
  },
  output: {
    filename: 'app.js',
    path: BUILD_DIR
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: [NODE_MODULE_PATH]
      },
      {
        test: /\.html|.css$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
