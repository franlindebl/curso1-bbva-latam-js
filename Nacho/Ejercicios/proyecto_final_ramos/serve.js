var express = require('express');
var app = express();
console.log(__dirname);
app.use("/", express.static(__dirname + '/'));

app.listen(process.env.npm_package_config_port);