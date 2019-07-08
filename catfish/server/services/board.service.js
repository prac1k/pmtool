const Board = require('../models/board.model')

var populateQuery = [{path:"lists", select: ["title"], model: "List", populate: {path: "cards", select: ["title", "body", "assignedBy"], model: "Card"}}, {path:'users', select:'name', model:"User"}];

module.exports = {



    getAll (req, res) {
        Board.find({}, 'title',(err, boards) => {
            this._handleResponse(err, boards, res)
        })
    },
    getById (req, res) {
        Board.findOne({_id: req.params.boardId})
            .populate(populateQuery)

                // path:"lists",
                // select: ["title"],
                // model: "List",
                // populate: {
                //     path: "cards",
                //     select: ["title", "body", "assignedBy"],
                //     model: "Card"
                //     },
                //  path:"users",
                //  select:"name",
                //  model: "User",

            // })
            .exec((err, board) => {
                this._handleResponse(err, board, res)
                console.log(board);
            })
    },
    update (req, res) {
        Board.findByIdAndUpdate(req.params.boardId, {title: req.body.title}, (err, board) => {
            this._handleResponse(err, board, res)
        })
    },


    boardAssignUsers (req, res) {
        Board.findById(req.body.boardId, (err, board) => {
            if (err) {
                res.status(400).end()
                return
            }
            board.users = req.body.userIds
            board.save((err, savedBoard) => {
                this._handleResponse(err, savedBoard, res)
                console.log(savedBoard);
                })
        })
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
