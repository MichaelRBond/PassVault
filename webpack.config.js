var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: false,
      template: 'src/index.html'
    })
  ],
  module: {
    loaders: [
        { test: /\.vue$/, loader: 'vue-loader' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.ttf|\.woff|\.woff2|\.eot|\.svg$/, loader: "file" }
    ]
  }
};
