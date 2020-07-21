"use strict";exports.__esModule=true;exports.default=void 0;var _webpackDevMiddleware=_interopRequireDefault(require("webpack-dev-middleware"));var _webpackHotMiddleware=_interopRequireDefault(require("webpack-hot-middleware"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const ignored=[/[\\/]\.git[\\/]/,/[\\/]node_modules[\\/]/];class HotReloader{constructor(multiCompiler){this.send=(action,...args)=>{this.webpackHotMiddleware.publish({action,data:args});};const webpackDevMiddleware=(0,_webpackDevMiddleware.default)(multiCompiler[0],{// noInfo: true,
// logLevel: 'silent',
watchOptions:{ignored}// writeToDisk: true,
});const webpackHotMiddleware=(0,_webpackHotMiddleware.default)(multiCompiler[0],{// path: '/__webpack_hmr',
log:console.log,heartbeat:2500});this.webpackDevMiddleware=webpackDevMiddleware;this.webpackHotMiddleware=webpackHotMiddleware;this.middlewares=[webpackDevMiddleware,webpackHotMiddleware];// multiCompiler[1].hooks.done.tap('HotReloaderForServer', (stats) => {
//     console.log('HotReloaderForServer');
//     this.send('reloadPage')
// })
multiCompiler[0].hooks.done.tap('HotReloaderForClient',stats=>{this.send('reloadPage');});}async run(req,res,parsedUrl){for(const fn of this.middlewares){await new Promise((resolve,reject)=>{fn(req,res,err=>{if(err)return reject(err);resolve();});});}}}exports.default=HotReloader;