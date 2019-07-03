const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const config = require('./config/index')
require('rootpath')();
const cors = require('cors');
const errorHandler = require('_helpers/error-handler');
const jwt = require('_helpers/jwt');


mongoose.connect(config.dbConnection, { useNewUrlParser: true})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//app.use(jwt());
const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);

const apiRoutes = require('./routes/api');
app.use('/server', apiRoutes, );
app.use('/users', require('./routes/users.controller'));
app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

