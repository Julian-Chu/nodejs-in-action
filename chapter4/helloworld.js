var http = require('http');
var server = http.createServer(function(req, res){
  var body = "<h1>Hello world</h1>";
  res.setHeader('Content-Type','text/plain');
  res.statusCode = 404;
  res.write(body);
  res.end();
})

server.listen(3000, ()=>{
  console.log("Server is running on 3000");
})