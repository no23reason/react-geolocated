import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackRemarkPlugin from 'html-webpack-remark-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import React from 'react';
import ReactDOM from 'react-dom/server';

import App from './demo/App.jsx';
import pkg from './package.json';

import js from 'highlight.js/lib/languages/javascript';

const RENDER_UNIVERSAL = false;
const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = __dirname;
const config = {
  paths: {
    readme: path.join(ROOT_PATH, 'README.md'),
    docs: path.join(ROOT_PATH, 'docs-resources', 'DOCS.md'),
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    demo: path.join(ROOT_PATH, 'demo'),
    tests: path.join(ROOT_PATH, 'tests'),
  },
  filename: 'geolocated',
  library: 'Geolocated',
};
const CSS_PATHS = [
  config.paths.demo,
  path.join(ROOT_PATH, 'node_modules', 'purecss'),
  path.join(ROOT_PATH, 'node_modules', 'highlight.js', 'styles', 'github.css'),
  path.join(ROOT_PATH, 'node_modules', 'react-ghfork', 'gh-fork-ribbon.ie.css'),
  path.join(ROOT_PATH, 'node_modules', 'react-ghfork', 'gh-fork-ribbon.css'),
];
const STYLE_ENTRIES = [
  'purecss',
  'highlight.js/styles/github.css',
  'react-ghfork/gh-fork-ribbon.ie.css',
  'react-ghfork/gh-fork-ribbon.css',
  './demo/main.css',
];

process.env.BABEL_ENV = TARGET;

const demoCommon = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg'],
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: [
          config.paths.demo,
          config.paths.src,
        ],
      },
    ],
    loaders: [
      {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png',
        include: config.paths.demo,
      },
      {
        test: /\.jpg$/,
        loader: 'file',
        include: config.paths.demo,
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(ROOT_PATH, 'package.json'),
      },
    ],
  },
};

if (TARGET === 'start') {
  module.exports = merge(demoCommon, {
    devtool: 'eval-source-map',
    entry: {
      demo: [config.paths.demo].concat(STYLE_ENTRIES),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + ' — ' + pkg.description,
        template: 'docs-resources/index_template.ejs',

        // Context for the template
        name: pkg.name,
        description: pkg.description,
        demonstration: '',
      }),
      new HtmlWebpackRemarkPlugin({
        key: 'documentation',
        file: config.paths.docs,
        languages: {
          js,
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: CSS_PATHS,
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: [
            config.paths.demo,
            config.paths.src,
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      stats: 'errors-only',
    },
  });
}

function NamedModulesPlugin(options) {
  this.options = options || {};
}
NamedModulesPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('before-module-ids', function(modules) {
      modules.forEach(function(module) {
        if(module.id === null && module.libIdent) {
          var id = module.libIdent({
            context: this.options.context || compiler.options.context,
          });

          // Skip CSS files since those go through ExtractTextPlugin
          if(!id.endsWith('.css')) {
            module.id = id;
          }
        }
      }, this);
    }.bind(this));
  }.bind(this));
};

if (TARGET === 'make-docs') {
  module.exports = merge(demoCommon, {
    entry: {
      app: config.paths.demo,
      vendors: [
        'react',
      ],
      style: STYLE_ENTRIES,
    },
    output: {
      path: './docs',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
    },
    plugins: [
      new CleanPlugin(['docs'], {
        verbose: false,
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.DefinePlugin({
          // This affects the react lib size
        'process.env.NODE_ENV': '"production"',
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + ' — ' + pkg.description,
        template: 'docs-resources/index_template.ejs',

        // Context for the template
        name: pkg.name,
        description: pkg.description,
        demonstration: RENDER_UNIVERSAL ? ReactDOM.renderToString(<App />) : '',
      }),
      new HtmlWebpackRemarkPlugin({
        key: 'documentation',
        file: config.paths.docs,
        languages: {
          js,
        },
      }),
      new NamedModulesPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendors', 'manifest'],
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: CSS_PATHS,
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            config.paths.demo,
            config.paths.src,
          ],
        },
      ],
    },
  });
}

// !TARGET === prepush hook for test
if (TARGET === 'test' || TARGET === 'test:tdd' || !TARGET) {
  module.exports = merge(demoCommon, {
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['eslint'],
          include: [
            config.paths.tests,
          ],
        },
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: [
            config.paths.src,
            config.paths.tests,
          ],
        },
      ],
    },
  })
}
