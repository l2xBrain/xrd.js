#!/usr/bin/env node
"use strict";var _arg=_interopRequireDefault(require("arg"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}// import comBuild from './cli/build';
// import comDev from './cli/dev';
const args=(0,_arg.default)({// Types
'--version':Boolean,'--help':Boolean,'--inspect':Boolean,// Aliases
'-v':'--version','-h':'--help'},{permissive:true});console.log('args=>',args);const commands={// build: comBuild,
// dev: comDev
};const defaultCommand='dev';const foundCommand=Boolean(commands[args._[0]]);const command=foundCommand?args._[0]:defaultCommand;const forwardedArgs=foundCommand?args._.slice(1):args._;const defaultEnv=command==='dev'?'development':'production';process.env.NODE_ENV=process.env.NODE_ENV||defaultEnv;commands[command]().then(exec=>exec(forwardedArgs));