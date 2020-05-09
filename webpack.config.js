const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map', 
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      middleware: path.resolve(__dirname, 'src/middleware/'),
      models: path.resolve(__dirname, 'src/models/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      secrets: path.resolve(__dirname, 'src/secrets/'),
      'input-schemas': path.resolve(__dirname, 'src/input-schemas/'),
      authorizer: path.resolve(__dirname, 'src/authorizer/'),
    }
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  }
};
