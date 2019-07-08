const express = require("express")
const router = express.Router()
const boardService = require("../services/board.service")
const listService = require("../services/list.service")
const cardService = require("../services/card.service")

router.post("/lists", listService.create.bind(listService))
router.post("/boards", boardService.create.bind(boardService))
router.post("/cards/", cardService.create.bind(cardService))
router.get("/boards", boardService.getAll.bind(boardService))
router.get("/lists/:listId", listService.getById.bind(listService))
router.get("/cards/:cardId", cardService.getById.bind(cardService))
router.get("/boards/:boardId", boardService.getById.bind(boardService))
router.put("/boards/updateListsOrder", boardService.updateListsOrder.bind(boardService))
router.put("/cards/updateCardsOrder", listService.updateCardsOrder.bind(listService))
router.put("/boards/:boardId", boardService.update.bind(boardService))
router.put("/cards/:cardId", cardService.updateCardTitle.bind(cardService))
router.post("/cards/:cardId", cardService.updateCardBody.bind(cardService))



module.exports = router
