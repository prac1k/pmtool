const Board = require('../models/board.model')
const User = require('../models/user.model')

var mongoose = require('mongoose');
var populateQuery =
    [{path:"lists", select: ["title"],
    model: "List",
    populate: {path: "cards", select: ["title", "body", "assignedBy", "assignedTo"],
    model: "Card",
    populate: {path:'users', select: ["name", "lastname", "avatar", "cards"],
    model:"User"}}},

    {path:"lists", select: ["title"],
     model: "List",
     populate: {path: "cards", select: ["title", "body", "assignedBy", "assignedTo"],
      model: "Card",
      populate: {path:'assignedTo', select: ["name", "lastname", "avatar", "cards"],
       model:"User"}}},


    {path:'users', select: ["name", "lastname", "avatar", "cards"],
    model:"User"}];
var populateMyBoardsQuery =
    [{path:'boards', match: [users = "userId"], select: ["title"],
    model:"Board"}];



module.exports = {



    getAll (req, res) {
        Board.find({}, 'title',(err, boards) => {
            this._handleResponse(err, boards, res)
        })
    },
    getById (req, res) {
        Board.findOne({_id: req.params.boardId})
            .populate(populateQuery)
            .exec((err, board) => {
                this._handleResponse(err, board, res)
                console.log(board);
            })
    },

// get list of my boards
    getMyBoards (req, res) {
        User.findOne({_id: req.body.userId})
            .populate([{

                    path: "boards" ,
                    select: ["title"],
                    model: "Board",

            }])
            .exec((err, boards) => {
            this._handleResponse(err, boards, res)
                console.log('getmyboards', boards);
        })
    },



    update (req, res) {
        Board.findByIdAndUpdate(req.params.boardId, {title: req.body.title}, (err, board) => {
            this._handleResponse(err, board, res)
        })
    },

//assign user to the board + board to the user
    boardAssignUsers (req, res) {
        const boardId = mongoose.Types.ObjectId(req.body.boardId);
        const userIds = mongoose.Types.ObjectId(req.body.userIds);
        Promise
            .all([
                Board.findByIdAndUpdate({_id: boardId},
                    {$push: {users: {_id: userIds}}},
                    {new: true})
                    .exec(),
                User.findByIdAndUpdate({_id: userIds},
                    {$push: {boards: {_id: boardId}}},
                    {new: true})
                    .exec()
            ])
            .then(results => {
                res.status(200).json({message: "User assigned to board", data: results})
            })
            .catch(err => {
                res
                    .status(500).json({
                    error: err.message
                });
            });
    },

    updateListsOrder (req, res) {
        Board.findById(req.body.boardId, (err, board) => {
            if (err) {
                res.status(400).end()
                return
            }
            board.lists = req.body.listIds
            board.save((err, savedBoard) => {
                this._handleResponse(err, savedBoard, res)
            })
        })
    },

    create (req, res) {
         Board.create({title: req.body.title, users: req.body.users}, function (err, board)
        {
            if (err) return this._handleResponse(err, board, res);
            res.status(200).json({message:'ok'})
        });
    },


    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    },

}
