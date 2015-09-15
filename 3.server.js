/**
 * 1. Error: listen EADDRINUSE 端口被占用
 * 2. 六边形
 * 3. 模块
 *
 */
//开店指南
var  http = require('http');
var fs = requrie('fs');
//服务员
var waitress = function(request,response){
    console.log(request.method);//取得请求的方法
    console.log(request.url);//取得URL路径
    console.log(request.headers);//取得headers头
    var urls = request.url.split('?');
    var pathanme = urls[0];//取得路径名称
    var queryObj = {};//把查询字符串转成对象
    if(urls[1]){
        var fields = urls[1].split('&');

        fields.forEach(function(field){
            var values = field.split('=');
            queryObj[values[0]] =  [values[1]];
        })

    }
    //设置内容类型，让浏览器正确解析响应
    response.setHeader('Content-Type','text/html;charset=utf-8');
    if(request.url == '/'){//如果访问的是根目录

    }else if(pathanme == '/fish'){//如果要吃鱼
        //返回内容，包括查询 字符串里的数量和量词，要对中文进行解码。
        response.end(queryObj.num+decodeURIComponent(queryObj.measure)+'红烧鱼');
    }else if(pathanme == '/pork'){
        response.end(queryObj.num+decodeURIComponent(queryObj.measure)+'红烧排骨');
    }else if(pathanme == '/meat'){
        response.end(queryObj.num+decodeURIComponent(queryObj.measure)+'红烧肉');
    }
}
//开了一家分店
var server = http.createServer(waitress);
//开启迎接客人
server.listen(8080,'localhost');
