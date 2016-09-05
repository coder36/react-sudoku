var express = require('express');
var app = express();

app.get("/api", function(req,resp) {
    resp.send("Hello world");
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function(err) {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express listening at %s:%s', host, port);
});


