/**
 * 1. Error: listen EADDRINUSE 端口被占用
 * 2. 六边形
 * 3. 模块
 *
 */
//开店指南
var  http = require('http');
//服务员
var waitress = function(request,response){
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
    var urls = request.url.split('?');
    var pathanme = urls[0];
    var queryObj = {};
    if(urls[1]){
        var fields = urls[1].split('&');

        fields.forEach(function(field){
            var values = field.split('=');
            queryObj[values[0]] =  [values[1]];
        })

    }
    response.setHeader('Content-Type','text/html;charset=utf-8');
    if(request.url == '/'){
        response.write('<ul>');
        response.write('<li><a href="/fish?measure=条&num=2">红烧鱼</a></li>');
        response.write('<li><a href="/pork?measure=桶&num=2">红烧排骨</a></li>');
        response.write('<li><a href="/meat?measure=碗&num=2">红烧肉</a></li>');
        response.write('</ul>');
        response.end();
    }else if(pathanme == '/fish'){
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
