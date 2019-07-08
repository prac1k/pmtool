import axios from "axios"

export default {
  create (listId, cardTitle, assignedBy) {
    return axios.post("/server/cards", {
      listId: listId,
      title: cardTitle,
      body: ' ',
      assignedBy: assignedBy,
    }).then(res => res.data)
  },
  findById(listId) {
    return axios.get("/server/lists/" + listId).then(res => res.data)
  },
  updateCardsOrder(listId, cardIds) {
    return axios
      .put("/server/cards/updateCardsOrder", {
        listId: listId,
        cardIds: cardIds
      })
      .then(res => res.data)
  },
  updateCardTitle(cardId, title) {
    return axios.put(
      "/server/cards/" + cardId,
      {
        title: title
      }
    ).then(res => res.data)
  },
  updateCardBody(cardId, body) {
    return axios.post(
      "/server/cards/" + cardId,
      {
        body: body
      }
    ).then(res => res.data)
  },
}


