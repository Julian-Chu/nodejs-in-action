var http = require('http');
var url = require('url');
var items = ['test'];

var server = http.createServer((req, res)=>{
    console.log('req.method',req.method);
    console.log('url:', url.parse(req.url));
    console.log('path:', url.parse(req.url).pathname);
    switch(req.method){
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', (chunk)=>{
                item += chunk;
            });
            req.on('end', ()=>{
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach((item,i)=>{
                res.write(i + ') ' + item +'\n');
            });
            res.end();
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1),10);

            if(isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]){
                res.statusCode = 404;
                res.end('Item not found');
            } else{
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});

server.listen(3000);