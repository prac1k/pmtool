const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB');
const users = require('./routes/users');
const addusers = require("./routes/crudusers")
const passport = require("passport");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./passport")(passport);
app.use('/users', users);
app.use('/addusers', addusers)
// Passport middleware
app.use(passport.initialize());
// Passport config

//new manul
app.get('/', function(req, res) {
    res.send('hello');
});

const port = process.env.PORT || 4000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

