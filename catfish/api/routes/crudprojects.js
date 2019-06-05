const express = require('express');
const boardRoutes = express.Router();

// Require Business model in our routes module
const Board = require('../models/project.model');

// Defined store route
boardRoutes.route('/add').post(function (req, res) {
    let board = new Board(req.body);
    board.save()
        .then(board => {
            res.status(200).json({'board': 'business in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
boardRoutes.route('/').get(function (req, res) {
    Board.find(function(err, boards){
        if(err){
            console.log(err);
        }
        else {
            res.json(boards);
        }
    });
});

// Defined edit route
boardRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Board.findById(id, function (err, board){
        res.json(board);
    });
});

boardRoutes.route('/board/:id').get(function (req, res) {
    let id = req.params.id;
    Board.findById(id, function (err, board){
        res.json(board);
    });
});


//  Defined update route
boardRoutes.route('/update/:id').post(function (req, res) {
    Board.findById(req.params.id, function(err, board) {
        if (!board)
            res.status(404).send("data is not found");
        else {
            board.board_title = req.body.board_title;
            board.board_description = req.body.board_description;
            board.board_responsible = req.body.board_responsible;
            board.board_completed = req.body.board_completed;


            board.save().then(board => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
boardRoutes.route('/delete/:id').get(function (req, res) {
    Board.findByIdAndRemove({_id: req.params.id}, function(err, board){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = boardRoutes;



/*
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');


const express = require('express');
const boardRoutes = express.Router();

// Require User model in our routes module
let Board = require('../models/project.model');

// Defined store route
boardRoutes.route('/add').post(function (req, res) {

            const newBoard = new Board({
                board_title: req.body.board_title,
                board_description: req.body.board_description,
                board_responsible: req.body.board_responsible,
                board_completed: req.body.board_completed
            });

            newBoard.save()
                .then(board => {
                 res.json(board)
                  });
                        }
                    );



// Defined get data(index or listing) route
boardRoutes.route('/').get(function (req, res) {
    User.find(function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

// Defined edit route
boardRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user){
        res.json(user);
    });
});

//  Defined update route
boardRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {

            user.namename = req.body.name,
                user.email = req.body.email,
                user.role = req.body.role,
                user.password = req.body.password


            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            user.password = hash;
                            user
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




// Defined delete | remove | destroy route
boardRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = boardRoutes;
*/
