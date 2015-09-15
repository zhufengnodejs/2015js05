var  http = require('http');
/**
 * request
 * @param request 请求对象 可以听到客户端说什么
 * @param response 回应对象 可以通过这个对象向客户端说话
 */
var serve = function(request,response){
    response.write('hello');
    response.write('world');
    response.end();
}
//作为参数传进去，在请求到来的时候调用
var server = http.createServer(serve);
//在某个主机的某个端口上监听客户端的请求
server.listen(8080,'localhost');

