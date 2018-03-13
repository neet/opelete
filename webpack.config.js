const path    = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {

  stats: { errorDetails: true },

  entry: {
    main: './src/googlete/main.js',
    style: './src/styles/main.scss',
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
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
    extensions: ['.js'],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      publicPath: '/dist/',
    }),

    new CopyWebpackPlugin([
      { from: './src/images/icon.png',          to: './' },
      { from: './src/images/icon@2x.png',       to: './' },
      { from: './src/config/manifest.json',     to: './' },
      { from: './src/images/icon-dark-16.png',  to: './' },
      { from: './src/images/icon-dark-32.png',  to: './' },
      { from: './src/images/icon-light-16.png', to: './' },
      { from: './src/images/icon-light-32.png', to: './' },
    ]),
  ],

};

module.exports = config;
