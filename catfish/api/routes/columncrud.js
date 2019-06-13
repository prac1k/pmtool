const express = require('express');
const columnRoutes = express.Router();

// Require Business model in our routes module
const Column = require('../models/column.model');

// Defined store route + taking the ID from URL
columnRoutes.route('/:column_board/column/add').post(function (req, res) {
    const column_board_req = req.params.column_board;
    const column = new Column({
        column_board: column_board_req,
        ...req.body});
    column.save()
        .then(column => {
            res.status(200).json({'column': 'column in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//  route provide list of data depending on ID
columnRoutes.route('/:column_board').get(function (req, res) {
    let columns = req.params.column_board;

    Column.find({column_board:columns})
        .select("column_title column_position")
        .exec()
        .then(columns=>{
            res.status(200).json({column_board:columns});
        })
        .catch(err =>{
            res.status(500).json(err.message);
        })
});

// Defined edit route
columnRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Column.findById(id, function (err, column){
        res.json(column);
    });
});

columnRoutes.route('/boards/project/:id').get(function (req, res) {
    let id = req.params.id;
    Column.findById(id, function (err, board){
        res.json(board);
    });
});


//  Defined update route
columnRoutes.route('/update/:id').post(function (req, res) {
    Column.findById(req.params.id, function(err, column) {
        if (!column)
            res.status(404).send("data is not found");
        else {
            column.column_title = req.body.column_title;
            column.column_position = req.body.column_position;
            column.column_board = req.body.column_board;

            column.save().then(column => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
columnRoutes.route('/:column_board/column/delete/:id').get(function (req, res) {
    Column.deleteOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: err.message,
            });
        });
    // Column.findByIdAndRemove({_id: req.params.id}, function(err, column){
    //     console.log(_id);
    //     if(err) res.json(err);
    //     else res.json('Successfully removed');
    // });
});

module.exports = columnRoutes;
