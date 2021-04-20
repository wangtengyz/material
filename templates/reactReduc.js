const path = require('path')
const fs = require("fs");
const child_process = require('child_process');
const utils = require('../tools')


module.exports = function (filename) {
  // 文件名
  const _fileName = filename

  // 拷贝文件
  function copyMaterials(materialsPath) {
    // liunx
    function copyIt(from, to) {
      // 将模版文件进行拷贝
      child_process.spawn('cp', ['-r', from, to]);
      setTimeout(() => {
        const filePath = path.resolve(_fileName);
        // 循环文件 批量替换关键字
        fileLoop(filePath)
      }, 1000)
    }
  
    copyIt(materialsPath, _fileName);
  }

  // 重写内容
  function rewrite(childPath, content) {
    fs.writeFile(childPath, content, function() {
      // over
    })
  }
  
  // 文件循环loop，修改指定字符
  function fileLoop(filePath) {
    fs.readdir(filePath, function(err, files) {
      if (err) {
        console.warn(err)
      } else {
        files.forEach(function(filename) {
          var filedir = path.join(filePath, filename);
          fs.stat(filedir, function(eror, stats) {
            if (eror) {
              console.warn('获取文件stats失败');
            } else {
              // 判断是不是文件
              var isFile = stats.isFile();
              // 判断是不是文件夹
              var isDir = stats.isDirectory();
              if (isFile) {
                // read
                var content = fs.readFileSync(filedir, 'utf-8');
                // rewrite 文件名第一个字符大写
                const reComponentNameContent = content.replace(/\Demo/g, utils.stringFirstToUpperCase(_fileName));
                const _content = reComponentNameContent.replace(/\material/g, _fileName)
                rewrite(filedir, _content)
              }
              if (isDir) {
                fileLoop(filedir);
              }
            }
          })
        });
      }
    });
  }

  const localPath = path.resolve(__dirname, './reactRedux')
  copyMaterials(localPath)
}