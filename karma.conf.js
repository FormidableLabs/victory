'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/helpers/**/*.js',
      'test/specs/**/*.spec.js'
    ],
    preprocessors: {
      'test/specs/**/*.spec.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: 'babel-loader'
        },{
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }, {
          test: /\.styl$/,
          loader: "style-loader!css-loader!stylus-loader"
        }],
        postLoaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components|plugins|[.]spec[.]js)/,
          loader: 'istanbul-instrumenter'
        }]
      },
      resolve: {
        root: [__dirname],
        modulesDirectories: ['node_modules', 'src']
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    'PhantomJS_Desktop': {
      base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1000,
            height: 600
        }
      }
    },
    reporters: ['mocha', 'coverage'],
    browserNoActivityTimeout: 60000,
    plugins: [
      require('karma-coverage'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sinon-chai'),
      require('karma-webpack')
    ],
    coverageReporter: {
      type : 'text'
    },
    captureTimeout: 60000,
    singleRun: true
  });
};
