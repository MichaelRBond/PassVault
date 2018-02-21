var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const paths = {
  base: __dirname,
  build: path.join(__dirname, 'build'),
  node_modules: path.join(__dirname, 'node_modules'),
  src: path.join(__dirname, 'src'),
};

module.exports = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
    modules: [
      paths.src,
      paths.node_modules,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: false,
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts-loader'
        ]
      }
    ]
  },
};
