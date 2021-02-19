const { resolve } = require('path');
const htmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 插件必须要
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css 打包为一个文件
const webpack = require('webpack');

const htmlPluginConfig = {
  title: '二手交易平台',
  template: resolve(__dirname, 'html/index.html'),
  favicon: resolve(__dirname, 'html/favicon.ico')
}

const devServer = {
  contentBase: resolve(__dirname, 'dist'),
  compress: true, // 压缩
  port: 8889,
  hot: true,
  host: '127.0.0.1',
  open: true,
}

module.exports = {
  mode: "development",
  // mode: "production",
  entry: {
    main: resolve(__dirname, 'src/main.js')
  },
  devtool: "inline-source-map", // 跟踪错误信息
  devServer,
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    alias: {
      '@': resolve('src'),
      "Style": resolve('src/assets/styles')
    },
    // 只需在这两位置查找文件  提高打包速度
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.css$/i, use: [
          // 'style-loader',// 与 MiniCssExtractPlugin.loader 冲突 
          MiniCssExtractPlugin.loader,
          'css-loader'], exclude: /node_modules/
      },
      {
        test: /\.less$/i, use: [
          // 'style-loader',   // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'], exclude: /node_modules/
      },
      { test: /\.(jpg|svg|png|jepg|gif)$/i, type: 'asset/resource', exclude: /node_modules/ },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [resolve('src')],// 只在src文件夹下查找
        use: {
          loader: "babel-loader",
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlPlugin(htmlPluginConfig),
    new VueLoaderPlugin(),
    // 打包压缩浏览
    new BundleAnalyzerPlugin(),
    // 剥离CSS文件
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),

    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 15 // Minimum number of characters
    }),
  ],
  // 不打包 使用cdn
  externals: {
    'vue': 'Vue', // vue 
    'element-ui': 'ELEMENT',  // 因为element-ui对外暴露的全局变量是ELEMENT
    'nprogress': 'NProgress',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios'
  }
}
