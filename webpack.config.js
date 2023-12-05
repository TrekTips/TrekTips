const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: '/src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './popup.html',
      filename: 'popup.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './manifest.json', to: 'manifest.json' }],
    }),
  ],
  devServer: {
    port: 8080,
    proxy: {
      '/': 'http://localhost:1234',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
