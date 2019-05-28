var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.use(myLogger);

app.get('/', function (req, res) {
    res.send('Hello World!');
});
console.log("server started on 8000")
app.listen(8000);

