const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
]

const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['env', 'react'],
    },
  },
]

const client = {
  entry: './src/client.js',
  output: {
    path: __dirname + '/dist/public/',
    filename: 'bundle.js',
  },
  plugins,
  module: { loaders },
}

const server = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'backend.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins,
  module: { loaders },
}

module.exports = [client, server]
