<template>
  <div class="boards">
    <router-link v-for="board in boards" class="board" :key="board._id" :to="{ name: 'BoardPage', params: {boardId: board._id }}">
      {{ board.title }}
      </router-link>
<!--    <div class="boards-list">-->
<!--    <addable-->
<!--    class="add-new-board"-->
<!--    @addable-submit="addableSubmit">-->
<!--    <div class="addboard">Add Board</div>-->
<!--    </addable>-->
<!--    </div>-->
  </div>
</template>

<script>
  import boardService from "../services/board.service"
  export default {
    name: "Boards",
    data () {
      return {
        boards: []
      }
    },
    mounted () {
      boardService.getAll()
        .then(((boards) => {
          this.$set(this, "boards", boards)
        }).bind(this))
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
