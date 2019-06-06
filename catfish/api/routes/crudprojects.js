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
