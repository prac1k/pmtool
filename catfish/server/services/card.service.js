const List = require('../models/list.model')
const Card  = require ('../models/card.model')
const User = require('../models/user.model')

var mongoose = require('mongoose');
var populateQueryCards = [{path:"cards", select: ["title", "body", "assignedBy", "assignedTo"], model: "Card", populate: {path:'users', select: ["name", "lastname", "avatar", "cards"], model: "User"}}];

module.exports = {
    getById (req, res) {
        Card.findOne({_id: req.params.cardId})
            .populate(populateQueryCards)
            .exec((err, card) => {
                this._handleResponse(err, card, res)
                console.log(card);
            })
    },
    updateCardTitle (req, res) {
        Card.findByIdAndUpdate(req.params.cardId, {title: req.body.title}, (err, card) => {
            this._handleResponse(err, card, res)
        })
    },
    updateCardBody (req, res) {
        Card.findByIdAndUpdate(req.params.cardId, {body: req.body.body}, (err, card) => {
            this._handleResponse(err, card, res)
        })
    },

//assign user to the card + card to the user
    cardAssignToUsers (req, res) {
        const cardId = mongoose.Types.ObjectId(req.body.cardId);
        const assignUserIds = mongoose.Types.ObjectId(req.body.assignUserIds);
        Promise
            .all([
                Card.findByIdAndUpdate({_id: cardId},
                    {$push: {assignedTo: {_id: assignUserIds}}},
                    {new: true})
                    .exec(),
                User.findByIdAndUpdate({_id: assignUserIds},
                    {$push: {cards: {_id: cardId}}},
                    {new: true})
                    .exec()
            ])
            .then(results => {
                res.status(200).json({message: "User assigned to card", data: results})
                console.log(assignUserIds);
            })
            .catch(err => {
                res
                    .status(500).json({
                    error: err.message
                });
            });
    },
    create (req, res) {
        List.findById(req.body.listId, (err, list) => {
            console.log(list);
            if (err) {
                return this._handleResponse(err, null, res)
            }

            if (!list) {
                return this._handleResponse("Error", null, res)
            }

            Card.create({title: req.body.title, body: req.body.body, assignedBy: req.body.assignedBy}, (err, card) => {
                list.cards.push(card._id)
                list.save(() => {
                    this._handleResponse(err, card, res)
                    console.log(card);
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


