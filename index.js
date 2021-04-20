#!/usr/bin/env node
const { program } = require('commander');
const { resolve, join } = require('path')
// 处理文件
const fs = require("fs");

// 交互式命令
const inquirer = require('inquirer');
// cli版本
program.version(require('./package').version, '-v, --version', 'cli的最新版本');
// 引入模板文件
const templates = require('./templates/index');

const inquirerConfig = [
  { name: 'reactClass' },
  { name: 'vueTemplate'},
  { name: '基于react的redux物料模版v1.0'}
]

// 命令行选择列表
let prompList = [
    {
        type:'list',
        name: 'template',
        message: '请选择你想要生成的模板？',
        choices: inquirerConfig,
        default: inquirerConfig[0]
    }
]


console.log(resolve(__dirname, 'template/react-redux'))
console.log(join(process.cwd()))

// console.log('__dirname : ' + __dirname) // 返回运行文件所在的目录
// console.log('resolve   : ' + resolve('./')) // 当前命令所在的目录
// console.log('cwd       : ' + process.cwd()) // 当前命令所在的目录

const options = program.opts();
console.log('options', options);
// 创建文件命令行
program
    .command('create <filename>')
    .description('创建一个文件')
    .action(async (filename) => {
        const res = await inquirer.prompt(prompList)
        const { template } = res
        templates[template] && templates[template](filename)
    })


// 处理命令行输入的参数
program.parse(process.argv);
