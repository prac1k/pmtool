import axios from "axios"

export default {
  create (listId, cardTitle) {
    return axios.post("/server/cards", {
      listId: listId,
      title: cardTitle
    }).then(res => res.data)
  }
}
