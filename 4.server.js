var http = require('http');
var url = require('url');
var fs = require('fs');
var mongodb = require('mongodb');
var querystring = require('querystring');
var users = [];
http.createServer(function(request,response){
    var method = request.method;
  var urlObj = url.parse(request.url);
  var pathname = urlObj.pathname;
  if(pathname =='/favicon.ico'){
      response.end("404");
  }else if(pathname=='/reg'){
      request.setEncoding('utf8');
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
  }else if(pathname=='/login'){
      if(method.toLocaleLowerCase() == 'get'){
          var content = fs.readFileSync('./pages/login.html');
          response.end(content);
      }else{
          var result ;
          request.setEncoding('utf8');
          request.on('data',function(data){
              console.log(data);
              result =  data;
          });

          request.on('end',function(){
              var body = querystring.parse(result);
              console.log(users);
              console.log(body);
              for(var i=0;i<users.length;i++){
                  if(body.username == users[i].username &&
                      body.password == users[i].password){
                      response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                      response.end('欢迎'+body.username);
                      return ;
                  }
              }
              response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
              response.end('你的用户名或密码错误');
          });
      }
  }else if(pathname =='/validate'){
      var username ;
      request.on('data',function(data){
          username =  data;
      });

      request.on('end',function(){
          for(var i=0;i<users.length;i++){
              if(username == users[i].username){
                  response.end(JSON.stringify({code:'fail'}));
                  return ;
              }
          }
          response.end(JSON.stringify({code:'success'}));
      });
  }
}).listen(8080);