const List = require('../models/list.model')
const Card  = require ('../models/card.model')

module.exports = {
    create (req, res) {
        List.findById(req.body.listId, (err, list) => {
            console.log(list);
            if (err) {
                return this._handleResponse(err, null, res)
            }

            if (!list) {
                return this._handleResponse("Error", null, res)
            }

            Card.create({title: req.body.title}, (err, card) => {
                list.cards.push(card._id)
                list.save(() => {
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


