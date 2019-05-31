const express = require('express');
const usersRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const Users = require('../models/users.model');

// @route POST api/users/register
// @desc Register user
// @access Public
usersRoutes.route('/register').post(function (req, res) {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Users.findOne({ email: req.body.email }).then(users => {

        if (users) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUsers = new Users({
                full_name: req.body.full_name,
                email: req.body.email,
                password: req.body.password
            });
// Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUsers.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUsers.password = hash;
                    newUsers
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
usersRoutes.route('/login').post(function (req, res) {
// Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    Users.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    full_name: user.full_name
                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// Users model to diplay list of users
// Require Users model in our routes module
//let Users = require('../models/users.model');

// Defined store route
usersRoutes.route('/add').post(function (req, res) {
    let users = new Users(req.body);
    users.save()
        .then(users => {
            res.status(200).json({'users': 'user is added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
usersRoutes.route('/').get(function (req, res) {
    Users.find(function(err, userses){
        if(err){
            console.log(err);
        }
        else {
            res.json(userses);
        }
    });
});

// Defined edit route
usersRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Users.findById(id, function (err, users){
        res.json(users);
    });
});

//  Defined update route
usersRoutes.route('/update/:id').post(function (req, res) {
    Users.findById(req.params.id, function(err, users) {
        if (!users)
            res.status(404).send("data is not found");
        else {
            users.full_name = req.body.full_name;
            users.role = req.body.role;
            users.email = req.body.email;
            users.phone_number = req.body.phone_number;
            users.password = req.body.password;

            users.save().then(users => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
usersRoutes.route('/delete/:id').get(function (req, res) {
    Users.findByIdAndRemove({_id: req.params.id}, function(err, users){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = usersRoutes;
