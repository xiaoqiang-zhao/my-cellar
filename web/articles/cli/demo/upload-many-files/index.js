#!/usr/bin/env node

/**
 * 入口文件
 */

const program = require('commander');

const setConfig = require('./src/set-config');
const startUpload = require('./src/start');
const reset = require('./src/reset');

program
  .version('1.0.0')
  // 配置相关参数
  .option('init, --init', '批量配置初始化参数，示例: upload-many-files init --server-url http://xx.xx.xx --folder-path /home/user/xxx --extname jpeg,png')
  .option('-su, --server-url <>', '上传路径配置，示例: upload-many-files --server-url http://xx.xx.xx')
  .option('-fp, --folder-path <>', '本地文件夹路径配置，示例: upload-many-files --folder-path /home/user/xxx')
  .option('-s, --extname <>', '上传路径配置，示例: upload-many-files --extname jpeg,png')

  // start 开始上传指令
  .option('start, --start', '开始上传，示例: upload-many-files start')

  // 将设置回归到安装初始化状态
  .option('reset, --reset', '开始上传，示例: upload-many-files reset')
  .parse(process.argv);

// 配置初始化
setConfig.pipe(program);
// 开始上传
startUpload.pipe(program);
// 重置到处是状态
reset.pipe(program);
