var express = require('express');
var app = express();

// var path = require('path');
/*
app.get('/', function(req, res) {
    console.log(res.url);
    res.sendFile(path.join(__dirname + process.env.npm_package_main));
});
*/

app.use('/', express.static(__dirname + '/'));

app.listen(process.env.npm_package_config_port);


// nohup node server.js &