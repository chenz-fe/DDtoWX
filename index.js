var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹
var filePath = path.resolve('/Users/xxxx/Desktop/wxKeXin');

fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();
            var isDir = stats.isDirectory();
            if (isFile) {
              var thisFilename = path.basename(filedir);
              if (/.acss|.axml/.test(thisFilename)) {
                var FileN = thisFilename.split('.');
                var newFileName = FileN[0] + '.';
                newFileName =
                  FileN[1] === 'acss'
                    ? newFileName + 'wxss'
                    : newFileName + 'wxml';
                var parentDir = path.dirname(filedir);
                var newPath = parentDir + '/' + newFileName;
                var oldPath = filedir;
                fs.rename(oldPath, newPath, function(err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('修改成功：' + newPath);
                  }
                });
              }
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}
