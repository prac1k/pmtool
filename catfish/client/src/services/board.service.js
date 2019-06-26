import axios from "axios"

export default {
  getAll() {
    return axios.get("/server/boards").then(res => res.data)
  },
  findById(boardId) {
    return axios.get("/server/boards/" + boardId).then(res => res.data)
  },
  update(boardId, title) {
    return axios.put(
      "/server/boards/" + boardId,
      {
        title: title
      }
    ).then(res => res.data)
  },
  updateListsOrder(boardId, listIds) {
    return axios
      .put("/server/boards/updateListsOrder", {
        boardId: boardId,
        listIds: listIds
      })
      .then(res => res.data)
  }

}

