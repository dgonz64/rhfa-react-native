const path = require('path')
const package = require('./package.json')

const { NODE_ENV } = process.env

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: 'source-map',
  entry: {
    'rhfa-react-native': './src/index.js',
    'emergencyStyles': './src/emergencyStyles.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name]${NODE_ENV === 'production' ? '.min' : ''}.js`,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-hook-form-auto': 'react-hook-form-auto/dist/base.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    'react': 'react',
    'react-native': 'react-native',
    'react-hook-form': 'react-hook-form',
    '@react-native-community/checkbox': '@react-native-community/checkbox',
    '@react-native-community/slider': '@react-native-community/slider',
    '@react-native-picker/picker': '@react-native-picker/picker'
  }
}
