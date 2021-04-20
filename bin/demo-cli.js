#!/usr/bin/env node

// 1. #!/usr/bin/env node 这段话的意思是让使用 node 进行脚本的解释程序，那下面的就可以使用 node 的语法了

// 2. process.argv.slice(2)，//从进程中获取参数

// 3. 上面这段脚本当被加载执行的时候，会首先执行run方法，并且传入进程输入的参数。


function run (argv) {
  if (argv[0] === '-v' || argv[0] === '--version') {
      console.log('  version is 0.0.1');
  } else if (argv[0] === '-h' || argv[0] === '--help') {
      console.log('  usage:\n');
      console.log('  -v --version [show version]');
  }
}
console.log('进程中获取参数', process.argv);
run(process.argv.slice(2));
// 4. 现在我们把bin需要的可执行js文件已经创建好，接下来需要在package.json中描述进去.
// 5. 打成全局包 必须要打成全局包才可以使用该命令,打成全局包的命令
// npm link 或者 npm install . -g

// 6. 输入 `demo-cli -v` 或者 `demo-cli -h`

// 7. npm unlink 取消link