const merge = require('webpack-merge');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const nodeExternals = require('webpack-node-externals');
const htmlWebpackPlugin = require('html-webpack-plugin')

const common = {
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sc|c)ss$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.ts', '.js', '.vue' ]
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = [
  merge(common, {
    entry: './src/plugin.ts',
    output: {
      filename: 'vue-pie-chart.min.js',
      libraryTarget: 'window',
      library: 'PieChart'
    },
    plugins: [
      new htmlWebpackPlugin({
        template: 'src/demo.html',
        inject: 'head'
      })
    ]
  }),
  merge(common, {
    entry: './src/pie-chart.vue',
    output: {
      filename: 'vue-pie-chart.js',
      libraryTarget: 'umd',
      library: 'vue-pie-chart',
      umdNamedDefine: true
    },
    externals: [nodeExternals()]
  })
]
