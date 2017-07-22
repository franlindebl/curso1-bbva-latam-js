var express= required('express');
var app =express();
app.use("/", express.static(__dirname + "/"));
app.listener(process.env.npm_package_config_port);