const List = require('../models/list.model')
const Board = require('../models/board.model')
var populateListQuery = [{path:"lists", select: ["title"], model: "List", populate: {path: "cards", select: ["title", "body", "assignedBy", "assignedTo"], model: "Card", populate: {path:'users', select: ["name", "lastname", "avatar", "cards"], model:"User"}}}];
module.exports = {

    getById (req, res) {
        List.findOne({_id: req.params.listId})
            .populate(populateListQuery)
            .exec((err, list) => {
                this._handleResponse(err, list, res)
            })
    },

    updateCardsOrder (req, res) {
        List.findById(req.body.listId, (err, list) => {
            if (err) {
                res.status(400).end()
                return
            }

            list.cards = req.body.cardIds
            list.save((err, savedList) => {
                this._handleResponse(err, savedList, res)
                console.log(savedList);
            })
        })
    },

    create (req, res) {
        Board.findById(req.body.boardId, (err, board) => {
            if (err) {
                return this._handleResponse(err, null, res)
            }

            if (!board) {
                return this._handleResponse("Error", null, res)
            }

            List.create({title: req.body.title}, (err, card) => {
                board.lists.push(card._id)
                board.save(() => {
                    this._handleResponse(err, card, res)
                })
            })
        })
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    }
}
