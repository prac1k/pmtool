import axios from "axios"

export default {
  create (boardId, listTitle) {
    return axios.post("/server/lists", {
      boardId: boardId,
      title: listTitle
    }).then(res => res.data)
  },
  getById() {
    return axios.get("/server/lists").then(res => res.data)
  },

}
