const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js',
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['HtmlWebpackPlugin.loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],

            }
          }
        }
      ],
    },
  };
};
