const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const importReg = /\bimport\s[\'\"](.*)[\'\"]\;/g;    // import导入语法正则
const entryFileReg = /^index(.*).md$/;                  // 打包入口文件正则
const outFilePrefix = './dist/bundle_';                     // 打包输出文件前缀

// 给定一个入口文件进行打包
function bundle(entry) {
    entry = path.resolve(__dirname, entry);

    // 如果文件存在, 那么读取文件内容
    fs.exists(entry, function(has) {
        if(has) {
            fs.readFile(entry, 'utf-8', function(e, text) {

                // 使用正则匹配[import]语法, 然后替换为对应的文件内容
                let newText = text.replace(importReg, function(match, $1) {
                    let importFile = path.resolve(__dirname, path.dirname(entry), $1);    // 计算import文件路径
                    let importFileText = fs.readFileSync(importFile, 'utf-8');                     // 读取import文件内容
                    return importFileText;
                });

                // 计算打包后输出的文件名
                let bundleFileName = outFilePrefix + path.basename(entry);
                let bundleFilePath = path.resolve(__dirname, path.dirname(entry), bundleFileName);

                // 输出打包后的文件
                fs.writeFile(bundleFilePath, newText, function(e) {
                    if(e) {
                        console.error(`打包失败: ${entry}`);
                    } else {
                        console.info(`打包成功: ${entry}`);
                    }
                });
            });
        }
    });
}

gulp.task('default', function() {

    // 获取所有要打包的入口文件
    function getEntrys(entryDirectory) {

        // 遍历根目录
        fs.readdir(entryDirectory, function(e, rootFiles) {
            rootFiles.forEach(rootFile => {

                // 找出文件夹
                let rootFilePath = path.join(entryDirectory, rootFile);
                fs.stat(rootFilePath, function(e, stats) {
                    if(stats.isDirectory()) {

                        // 找入口文件, 进行打包
                        fs.readdir(rootFilePath, function(e, files) {
                            files.forEach(file => {
                                if(entryFileReg.test(file)) {
                                    console.log(`开始打包: ${path.join(rootFilePath, file)}`);
                                    bundle(path.join(rootFilePath, file))
                                }
                            });
                        });
                    }
                });
            });
        });
    }

    getEntrys('./')
});
