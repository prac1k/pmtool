<template>
  <div>
  <div class="boards">
    <router-link v-for="board in boards" class="board" :key="board._id" :to="{ name: 'BoardPage', params: {boardId: board._id }}">
      {{ board.title }}
            </router-link>
      </div>
  <addable
           class="add-new-board"
           @addable-submit="addableSubmit">
    <div class="addboard">Add Board</div>
  </addable>
  </div>
</template>

<script>
  import boardService from "../services/board.service"
  import Addable from "./Addable";
  export default {

    components:{
      Addable,
    },

    name: "Boards",
    data () {
      return {
        boards: []
      }
    },
    mounted () {
      this.getAllBoards()
    },
    methods: {
      addableSubmit (boardTitle) {
        console.log(boardTitle);
        if (!boardTitle || boardTitle.length === 0) {
          return;
        }
        boardService.create(boardTitle)
          .then((res) => {
            this.getAllBoards()
          })
      },
      getAllBoards(){
        boardService.getAll().then(((boards) => this.boards =boards))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
