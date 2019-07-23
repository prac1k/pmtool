import axios from "axios"

export default {
  getAll() {
    return axios.get("/server/boards").then(res => res.data)
  },
  getById() {
    return axios.get("/server/boards").then(res => res.data)
  },
  findById(boardId) {
    return axios.get("/server/boards/" + boardId).then(res => res.data)
  },
  getMyBoards(userId){
  return axios.get('/server/boards/getmyboards/' + userId)
  },

  update(boardId, title) {
    return axios.put(
      "/server/boards/" + boardId,
      {
        title: title
      }
    ).then(res => res.data)
  },
  boardAssignUsers(boardId, userIds) {
    return axios
      .post("/server/boards/" + boardId,{
        boardId: boardId,
        userIds: userIds,
      }
    ).then(res => res.data)
  },
  updateListsOrder(boardId, listIds) {
    return axios
      .put("/server/boards/updateListsOrder", {
        boardId: boardId,
        listIds: listIds
      }
      ).then(res => res.data)
  },

  create (boardTitle) {
    return axios.post("/server/boards", {
            title: boardTitle,
            users: []
    }).then(res => res.data)
  },

}


