const fs = require("fs");
module.exports = function (filename) {
  const content = `
import React from 'react';

export class ${filename} extends React.Component{
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
  fs.writeFile(`./${filename}.jsx`, content, function(err) {
    if(err) {
        console.log('创建失败：', err)
    } else {
        console.log(`创建文件成功！${filename}.jsx`);
    }
  })
}
