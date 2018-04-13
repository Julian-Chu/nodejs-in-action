var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  getTitles(req, res);
}).listen(8000, "127.0.0.1", function () {
  console.log("Server listening on port 8000");
});

function getTitles(req, res) {
  if (req.url === '/') {
    fs.readFile('./titles.json', function (err, data) {
      if (err) {
        hadError(err, res)(err)
      } else {
        getTemplate(data, res)
      }
    });
  }
}

function hadError(err, res) {
  console.error(err);
  res.end('Server Error');
}

function getTemplate(data, res) {
  var titles = JSON.parse(data.toString());
  titles = Object.values(titles);
  console.log(titles);

  fs.readFile('./template.html', function (err, data) {
    if (err) {
      hadError(err, res);
    } else {
      formatHtml(titles, data, res);
    }
  });
}

function formatHtml(titles, data, res) {
  var tmpl = data.toString();
  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(html);
}