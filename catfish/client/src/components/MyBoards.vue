<template>
  <div>
    <div class="boards">
      <router-link v-for="board in boards" class="board" :key="$data._id" :to="{ name: 'BoardPage', params: {boardId: board._id }}">
        {{ board.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import boardService from "../services/board.service"
  import authenticationService from '../services/authentication.service';
  export default {


    data () {
      return {
        user: authenticationService.currentUserValue.name,
        boards:  [],
        userFromApi: null,
        }
    },
      //deconstructing promise
    created () {
         const userId = authenticationService.currentUserValue._id;
         boardService.getMyBoards(userId).then(res => this.boards = res.data.boards);
       },
    }
  </script>
<style scoped>
  .boards {
    width: 80%;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    flex-wrap: wrap;
  }
  .board {
    border-radius: 3px;
    color: #FFFFFF;
    display: block;
    text-decoration: none;
    width: 15%;
    min-width: 150px;
    min-height: 80px;
    padding: 10px;
    background-color: rgb(0, 121, 191);
    margin: 0 15px 15px 0;
  }
</style>
