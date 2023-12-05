const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  devtool:'eval-source-map',

  output: {
    path: path.join(__dirname, '/build'),
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
      template: './client/src/popup.html',
      filename: 'popup.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './manifest.json', to: 'manifest.json' }],
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },

    proxy: {
      '/': 'http://localhost:3000/',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
