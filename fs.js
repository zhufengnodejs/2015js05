var fs = require('fs'); //file system
//异步方法
fs.readFile('./menu.html','utf8',function(err,data){
    console.log('1');
});
//同步读取文件
var content = fs.readFileSync('./menu.html','utf8');
console.log('2');