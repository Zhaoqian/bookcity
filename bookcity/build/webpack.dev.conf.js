'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const {readFileSync,existsSync} = require('fs')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const bodyParser = require('body-parser');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended: false }))
      app.get('/api/list',(req,res)=>{
        res.send(readFileSync(path.resolve('src/mock/index/home.json')))
      })
      app.get('/api/detail',(req,res)=>{
        let {bookid} = req.query;
        let check = existsSync(path.resolve('src/mock/detail/'+bookid+'.json'));
        
        if(check){
          res.send({'code':1,'msg':JSON.parse(readFileSync(path.resolve('src/mock/detail/'+bookid+'.json')))})
        }else{
          res.send({
            'code':0,
            'msg':"该书已下架"
          })
        }
      })
       app.post('/api/user',(req,res)=>{
         let {user,psd}=req.body;
         let data = JSON.parse(readFileSync(path.resolve('src/mock/user/user.json')));
         let flag = data.userInfo.find(item=>item.user==user&&item.pwd==psd);
         if(!flag){
            res.send({
              'code':0,
              'msg':'用户名或密码错误',
             
            })
         }else{
             res.send({
              'code':1,
              'msg':'登陆成功',
               'item':flag.user
            })
         }
         
        // res.send(readFileSync(path.resolve('src/mock/index/home.json')))
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
