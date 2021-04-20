#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

// function myParseInt(value, dummyPrevious) {
//   // parseInt takes a string and a radix
//   const parsedValue = parseInt(value, 10);
//   if (isNaN(parsedValue)) {
//     throw new commander.InvalidOptionArgumentError('Not a number.');
//   }
//   return parsedValue;
// }

// function increaseVerbosity(dummyValue, previous) {
//   return previous + 1;
// }

// function collect(value, previous) {
//   return previous.concat([value]);
// }

// function commaSeparatedList(value, dummyPrevious) {
//   return value.split(',');
// }

// program.version('0.0.4');
// // 1. 选项的默认值 选项可以设置一个默认值。
// .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
// // 2. 其他的选项类型，取反选项，以及可选参数的选项
// .option('--no-sauce', 'Remove sauce')
// // 3. 通过.requiredOption方法可以设置选项为必填。必填选项要么设有默认值，要么必须在命令行中输入
// .requiredOption('--cheese <flavour>', 'cheese flavour')
// .option('--no-cheese', 'plain with no cheese')
// // 4. 变长参数选项 定义选项时，可以通过使用...来设置参数为可变长参数。
// .option('-n, --number <numbers...>', 'specify numbers')
// .option('-l, --letter [letters...]', 'specify letters')
// 5. 自定义选项处理
// .option('-f, --float <number>', 'float argument', parseFloat)
// .option('-i, --integer <number>', 'integer argument', myParseInt)
// .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
// .option('-c, --collect <value>', 'repeatable value', collect, [])
// .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
// .parse();
// 6. 命令
program
  .version('0.1.0')
  .arguments('<username> [password]')
  .description('test command', {
    username: 'user to login',
    password: 'password for user, if required'
  })
  .action((username, password) => {
    console.log('username:', username);
    console.log('password:', password || 'no password given');
  })
  .parse();

// 分别装配命令
// 返回最顶层的命令以供继续添加子命令
// program.addCommand(build.makeBuildCommand());
const options = program.opts();
console.log('Options: ', options);
console.log('Remaining arguments: ', program.args);
