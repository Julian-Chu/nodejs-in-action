var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client){
  this.clients[id] = client;
  console.log('id '+ id + ' joined');
  client.write('id ' + id + ' joined');
  this.subscriptions[id] = function(senderId, message){
    if(id!=senderId){
      this.clients[id].write(message);
    }
  }
  this.on('broadcast', this.subscriptions[id])
})

channel.on('leave', function(id){
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + " has left the chat.\n");
})

channel.on('shutdown', function(){
  channel.emit('broadcast', '',"Chat has shut down");
  channel.removeAllListeners('broadcast');
})

var server = net.createServer(function(client){
  var id = client.remoteAddress + ':' + client.remotePort;
  // client.on('connect', function(){
    channel.emit('join', id , client);
  // });
  client.on('data', function(data){
    data = data.toString();
    channel.emit('broadcast',id ,data);
  });
  client.on('close',function(client){
    channel.emit('leave', id);
  });

  client.on('data', function(data){
    data = data.toString();
    console.log('data:', data);
    if(data === "shutdown\r\n"){
      channel.emit('shutdown');
    }
    channel.emit('broadcast' , id, data);
  })
});

server.listen(8888, ()=>{
  console.log('server start on 8888');
})