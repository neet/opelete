const path    = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {

  stats: { errorDetails: true },

  entry: {
    main: './src/googlete/main.js',
    style: './src/styles/main.scss',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'extension'),
    publicPath: '/extension/',
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
      publicPath: '/extension/',
    }),
  ],

};

module.exports = config;
