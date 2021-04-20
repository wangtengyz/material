 # 实现一个Node.js-CLI开发工具

## 初始化项目

```
npm init
```

## 自定义命令

cli都有自己个性化的命令，感觉有点酷炫。那么我们怎么才能实现自己的命令呢，很简单，在 package.json 添加 bin ：

```
{
  "name": "mycli",
  "version": "1.0.0",
  "description": "A cli-demo",
  "main": "index.js",
  "bin": {
    "material": "./index.js",
    "commander-cli": "./bin/commander-cli.js",
    "demo-cli": "./bin/demo-cli.js"
  },
  "author": "demo",
  "license": "MIT"
}
```

package.json中的 bin 的作用就是可以让设置的 mycli 成为一个可执行命令，而命令所执行的文件就是后面的 `./bin/demo-cli.js` ，这些都可以根据自己的想法来定。接着我们要继续对 demo-cli.js 进行修改：

```
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
```

## 交互式命令行

在初始化项目时， npm init 提供一些输入问答形式的命令。接下来，我们就来为自己的CLI工具添加这些类似的命令。

我们可以依赖两个库进行我们的开发， `commander.js`和`Inquirer.js`

```
1. commander.js：完整的 node.js 命令行解决方案。我们可以利用它，快速的编写我们的命令行，自定义化操作, [相关使用说明](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)。  

2. Inquirer.js：是常规交互式命令行用户接口的集合，提供给 Node.js 一个方便嵌入，漂亮的命令行接口。我们可以用来快速进行交互式命令行的编写,[相关使用说明](https://juejin.cn/post/6903039729604755464)。

```

## 创建模版文件

我们先来创建一个templates文件夹，然后在里面写几个常见的模板文件，这里的模板文件运用到了模板字符串，里面包括reactClass.js， vueTemplate.js， index.js。

### reactClass.js
```
module.exports = function (className) {
    return `
import * as React from 'react';

export class ${className} extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){

    }

    render() {
        return (
            <div></div>
        )
    }
}
    ` 
}
```

### vueTemplate.js
```
module.exports = function () {
    return `
    <template>
        <div></div>
    </template>
    <script>
    export default {
        data() {
            return {}
        }
        methods: {

        }
    }
    </sctipt>
    <style lang="scss" scoped>
    
    </style>
    `
}
```

### index.js
```
const reactClass = require('./reactClass');
const vueTemplate = require('./vueTemplate');

module.exports = [
    { name: 'reactClass', src: reactClass },
    { name: 'vueTemplate', src: vueTemplate }
]

```

## 创建交互命令行以及调用模板
当我们输入 mycli create file 命令后，我们可以手动上下进行选择，也就是可以被称为交互式的命令。

这里就要用到我们上文中提到的另外一个库——Inquirer.js

首先肯定需要进行安装`npm install inquirer`

引入并修改我们根目录下的index.js：
```
#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');

// 引入模板文件
const templates = require('./templates/index');

// 命令行选择列表
let prompList = [
    {
        type:'list',
        name: 'template',
        message: '请选择你想要生成的模板？',
        choices: templates,
        default: templates[0]
    }
]

...

// 创建文件命令行
program
    .command('create <filename>')
    .description('创建一个文件')
    .action(async (filename) => {
        const res = await inquirer.prompt(prompList)
        console.log(res)
    })

// 处理命令行输入的参数
program.parse(process.argv);

```

接下来我们在命令行中输入`material create file`

可以看到输出了我们所选择模板的名字。接下来就是进行实际文件的创建。

## 创建项目文件

创建文件则需要调用node.js的fs相关api，然后修改index.js：

```
// 处理文件
const fs = require("fs");

...

// 创建文件命令行
program
    .command('create <filename>')
    .description('创建一个文件')
    .action(async (filename) => {
        const res = await inquirer.prompt(prompList)
        if(res.template === 'reactClass') {
            templates.forEach((item) => {
                if(item.name === 'reactClass') {
                    fs.writeFile(`./${filename}.jsx`, item.src(filename), function(err) {
                        if(err) {
                            console.log('创建失败：', err)
                        } else {
                            console.log(`创建文件成功！${filename}.jsx`);
                        }
                    })
                }
            })
        }
        if(res.template === 'vueTemplate') {
            templates.forEach((item) => {
                if(item.name === 'vueTemplate') {
                    fs.writeFile(`./${filename}.vue`, item.src(), function(err) {
                        if(err) {
                            console.log('创建失败：', err)
                        } else {
                            console.log(`文件创建成功！${filename}`);
                        }
                    })
                }
            })
        } 
    })
    
...

```

我们再次在命令行中输入`mycli create file`，然后选择一个模板。

同时我们可以看见项目根目录下面新增了一个file文件夹：

## 结束
这只是一个简单的clidemo，还有很多各种各样的命令编写，让前端开发效率得到更多的提升。