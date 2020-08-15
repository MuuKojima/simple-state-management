const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
  entry: {
    app: resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name]-[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    inline: true,
    port: 8080,
    historyApiFallback: true
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      }
   ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
  ]
};
