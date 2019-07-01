import axios from "axios"

export default {
  create (listId, cardTitle) {
    return axios.post("/server/cards", {
      listId: listId,
      title: cardTitle
    }).then(res => res.data)
  },
  updateCardsOrder(listId, cardIds) {
    return axios
      .put("/server/cards/updateCardsOrder", {
        listId: listId,
        cardIds: cardIds
      })
      .then(res => res.data)
  },
}
