// webpack.config.js
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var path = require('path');

var base = require('./webpack.config.dev.js');

var OUTPUT_DIR = 'gh-pages';

var routes = [
  ''
];

module.exports = {
  entry: {
    main: './docs/entry.jsx'
  },
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  resolve: base.resolve,
  module: base.module,

  plugins: [
    new StaticSiteGeneratorPlugin('main', routes)
  ]
};
