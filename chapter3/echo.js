var net = require('net');

var server = net.createServer(function(socket){
  socket.once('data',function(data){
    socket.write(data);
    console.log(data);
  });
});

server.listen(8888,function(){
  console.log("server listen on 8888")
});