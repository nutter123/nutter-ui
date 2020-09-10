var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV === "production"

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: !isProd
});

module.exports = {
  entry: isProd ? {
    nutterUi: ['./packages/index.js'],
    nutterUiOptions: ['./packages/options.js'],
    components: ['./packages/components/index.js'],
    // filters: ['./packages/filters/index.js'],
    // plugins: ['./packages/plugins/index.js'],
    utils: ['./packages/utils/index.js']
  } : './test/src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: isProd ? '' : '/dist/',
    filename: isProd ? '[name].js' : 'NutterUi.js',
    library: 'NutterUi',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'resolve-url-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  externals: isProd ? /^[vue|axios|element-ui]/i : {},
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './'),
      '@packages': path.resolve(__dirname, './packages'),
      '@test': path.resolve(__dirname, './test/src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    extractSass
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (isProd) {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}