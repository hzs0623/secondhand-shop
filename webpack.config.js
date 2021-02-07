const { resolve } = require('path');
const htmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 插件必须要

const htmlPluginConfig = {
  title: '二手交易平台',
  template: resolve(__dirname, 'html/index.html'),
  favicon: resolve(__dirname, 'html/favicon.ico')
}

const devServer = {
  contentBase: resolve(__dirname, 'dist'),
  compress: true, // 压缩
  port: 8888,
  hot: true,
  host: '127.0.0.1',
  open: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3333', // 请求地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

module.exports = {
  mode: "development",
  entry: {
    main: resolve(__dirname, 'src/main.js')
  },
  devtool: "inline-source-map", // 跟踪错误信息
  devServer,
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    // publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(jpg|svg|png|jepg|gif)$/i, type: 'asset/resource' },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlPlugin(htmlPluginConfig),
    new VueLoaderPlugin()
  ]
}