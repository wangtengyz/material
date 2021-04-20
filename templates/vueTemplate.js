const fs = require("fs");
module.exports = function (filename) {
  const content =  `
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
  fs.writeFile(`./${filename}.vue`, content, function(err) {
    if(err) {
        console.log('创建失败：', err)
    } else {
        console.log(`创建文件成功！${filename}.vue`);
    }
  })
}
