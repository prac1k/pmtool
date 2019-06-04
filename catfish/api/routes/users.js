const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    User.findOne({email})

        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            role: user.role
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        },

                            (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    role: user.role
                                    });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: true }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    });
});

//old code correct add user
router.post('/add', (req, res) => {
const { errors, isValid } = validateRegisterInput(req.body);

if(!isValid) {
    return res.status(400).json(errors);
}
User.findOne({
    email: req.body.email
}).then(user => {
    if(user) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }
    else {
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
            if(err) console.error('There was an error', err);
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) console.error('There was an error', err);
                    else {
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.json(user)
                            });
                    }
                });
            }
        });
    }
});
});


// Defined get data(index or listing) route
router.get('/users', (req, res) =>  {
    Users.find(function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

// Defined edit route
router.get('/edit/:id',(req, res) => {
    let id = req.params.id;
    Users.findById(id, function (err, users){
        res.json(users);
    });
});

//  Defined update route
router.post('/update/:id', (req, res) =>  {
    Users.findById(req.params.id, function(err, users) {
        if (!users)
            res.status(404).send("data is not found");
        else {
            users.name = req.body.name;
            users.email = req.body.email;
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
router.get('/delete/:id', (req, res) => {
    Users.findByIdAndRemove({_id: req.params.id}, function(err, users){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});



module.exports = router;
