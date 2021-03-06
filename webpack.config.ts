const path = require("path")
const os = require('os')
function getIPAdress() {
  let localIPAddress = "";
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress;
}
const config = {
  entry: './src/index.tsx',
  output: {
    path: process.env.NODE_ENV == "production" ? path.resolve(__dirname, 'out/') : path.resolve(__dirname, 'www/'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['env', 'react'],
          plugins: [
            'transform-decorators-legacy',
            'add-module-exports',
            'transform-class-properties',
            'transform-object-rest-spread',
          ]
        }
      }
    }, {
      test: /\.(png|jpg|gif|svg|ttf)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      }
    },{
      test: /\.(less|css)$/,
      include: [ //样式只应用到这两个文件夹下面的css文件中
        path.resolve(__dirname, './src'),
      ],
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader')
        },
        {
          loader: require.resolve('less-loader')
        }
      ],
    },
    {
      test: /\.(tsx|ts)?$/,
      exclude: /(node_modules)/,
      use: ['ts-loader']
    }]
  },
  devServer: {
    host: getIPAdress(),
    port: 8080,
    hot: true,
    compress: true,
    contentBase: './www',
    proxy: [{
      context: ['/api'],
      target: 'http://49.233.85.54:3000',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
      secure: true
    }]
  },
  optimization: process.env.NODE_ENV === "production" ? {
    minimize: true
  } : {},
  performance: {
    hints: false
  },
  mode: process.env.NODE_ENV == "development" ? "development" : "production"
}
module.exports = config