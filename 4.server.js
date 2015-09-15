var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var users = [];
http.createServer(function(request,response){
    var method = request.method;
  var urlObj = url.parse(request.url);
  var pathname = urlObj.pathname;
    console.log(urlObj);
  if(pathname =='/favicon.ico'){
      response.end("404");
  }else if(pathname=='/reg'){
      if(method.toLocaleLowerCase() == 'get'){
          var content = fs.readFileSync('./pages/reg.html');
          response.end(content);
      }else{
          var result ;
          request.on('data',function(data){
              result =  data;
          });

          request.on('end',function(){
            var body = querystring.parse(result);
              users.push(body);
              response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
              response.end('注册成功');
          });
      }
  }
}).listen(8080);