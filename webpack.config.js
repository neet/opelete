const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {

  stats: { errorDetails: true },

  devtool: 'source-map',

  entry: {
    'main': './src/opelete/main.ts',
    'popup': './src/popup/popup.tsx',
    'omnibox': './src/opelete/omnibox.ts',
    'main-style': './src/styles/main.scss',
    'popup-style': './src/styles/popup.scss',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
        use: 'url-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
  },

  plugins: [
    new CleanWebpackPlugin([
      'dist',
    ]),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      publicPath: '/dist/',
    }),

    new CopyWebpackPlugin([
      { from: './src/config/manifest.json',     to: './' },
      { from: './src/popup/popup.html',         to: './' },
      { from: './src/images/icon.png',          to: './' },
      { from: './src/images/icon@2x.png',       to: './' },
      { from: './src/images/icon-dark-16.png',  to: './' },
      { from: './src/images/icon-dark-32.png',  to: './' },
      { from: './src/images/icon-light-16.png', to: './' },
      { from: './src/images/icon-light-32.png', to: './' },
      { from: './src/locales',                  to: './_locales' },
    ]),
  ],

};

module.exports = config;
