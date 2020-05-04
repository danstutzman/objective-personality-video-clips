const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.tsx',
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [path.resolve(__dirname, './node_modules/react-promise')]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'src'),
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: {
      index: '/',
    },
  }
}
