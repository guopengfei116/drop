const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const importReg = /\bimport\s[\'\"](.*)[\'\"]\;/g;  // 匹配import导入语法
const entryName = './index.md';                           // 统一的打包入口文件名
const outName = './dist/bundle.md'                     // 统一的打包输出文件名

// 给定一个入口文件进行打包
function bundle(entry) {
  entry = path.resolve(__dirname, entry);

  // 如果文件存在, 那么读取文件内容
  fs.exists(entry, function(has) {
    if(has) {

      fs.readFile(entry, 'utf-8', function(e, text) {

        // 进行正则替换
        let newText = text.replace(importReg, function(match, $1) {
          let importFile = path.resolve(__dirname, path.dirname(entry), $1); // 计算import文件路径
          let importFileText = fs.readFileSync(importFile, 'utf-8');                  // 读取import文件内容
          return importFileText;                                                                        // 进行替换
        });

        // 打包后的文件写入到当前目录下的bundle.md
        fs.writeFile(path.resolve(__dirname, path.dirname(entry), outName), newText);

      });

    }
  });
}

gulp.task('default', function() {

  // 获取所有要打包的入口文件
  function getEntrys(entryDirectory) {
    const entryList = [];

    // 从起始目录开始搜索
    fs.readdir(entryDirectory, function(e, files) {
      // 遍历文件
      files.forEach(filename => {
        // 读取文件信息
        var filePath = path.join(entryDirectory, filename);
        fs.stat(filePath, function(e, stats) {
          // 如果是目录, 打包目录下的入口文件
          if(stats.isDirectory()) {
            entryList.push(path.join(filePath, entryName));
            bundle(path.join(filePath, entryName))
          }
        });
      });
    });
  }

  getEntrys('./')
});
