//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: ['babel-polyfill','./client/index.js'],
 output: {
  path: path.join(__dirname, 'client'),
  filename: 'bundle.js'
 },
 module: {
  rules: [{
   test: /.jsx?$/,
   loader: 'babel-loader',
   exclude: /node_modules/,
   query: {
    presets: ['@babel/preset-env', '@babel/react']
   }
  },
  {
   test: /\.css$/,
   loader: "style-loader!css-loader"
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
        },
      },
    ]
  }
  ]
 },
 node: {
  fs: 'empty',
  crypto: 'empty',
  net: 'empty',
  tls: 'empty',
  dns: 'empty'
 },
 externals: ['mongodb-client-encryption']
}
