const path = require('path');

const webpack = require('webpack');
const validate = require('webpack-validator');
const combineLoaders = require('webpack-combine-loaders');

var webpackConfig = {
  entry: './src',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    library: 'TokenAutocomplete',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      utils: path.join(__dirname, 'src/_utils')
    },
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'src/TokenAutocomplete')
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src/TokenAutocomplete'),
          path.resolve(__dirname, 'src/TokenAutocomplete/options'),
          path.resolve(__dirname, 'src/TokenAutocomplete/options/option'),
          path.resolve(__dirname, 'src/TokenAutocomplete/token')
        ],
        loader: combineLoaders([
          {
            loader: 'style'
          },
          {
            loader: 'css',
            query: {
              modules: true,
              sourceMap: true,
              // localIdentName: '[folder]---[local]---[hash:base64:10]'
            }
          },
          {
            loader: 'postcss'
          }
        ])
      }
    ]
  },
  postcss: (webpack) => {
    return [
      require('postcss-import')({
        addDependencyTo: webpack,
        path: ['css', 'styles', 'views'],
        root: path.resolve(__dirname, 'src'),
        skipDuplicates: true
      }),
      require('postcss-cssnext')()
    ];
  }
};


//console.log('CURRENT CONFIG', JSON.stringify(conf, null, 4));

module.exports = validate(webpackConfig, {
  rules: {
    'no-root-files-node-modules-nameclash': true, //default
    'loader-enforce-include-or-exclude': false,
    'loader-prefer-include': true
  }
});
