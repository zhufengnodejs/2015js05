var fs = require('fs'); //file system
//异步方法
fs.readFile('./menu.html','utf8',function(err,data){
    console.log(data);
});
//同步读取文件
var content = fs.readFileSync('./menu.html','utf8');
console.log('2');