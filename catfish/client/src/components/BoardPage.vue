<template>
  <div class="board-page-main">
    <template v-if="board">
      <div class="board-title">
        <editable
          v-slot:default="slotProps"
          :field-value="board.title"
          @editable-submit="editableSubmitted"
        >
          <h2>{{ slotProps.inputText }}</h2>
        </editable>
      </div>
      <div class="assign-people">

      </div>

      <div class="board-lists">
        <addable
          class="add-new-list"
          @addable-submit="addableSubmit">
          <div class="addlist">Add list</div>
        </addable>
        <draggable v-model='lists' @start="drag=true" @end="drag=false" @change="log">
        <list
          v-for="(list, i) in lists"
          :key="list._id"
          :index="list._id"
          :list-prop="list"/>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script>
  import boardService from "../services/board.service";
  import Editable from "./EditableBoardTitle";
  import List from "./List";
  import listService from "../services/list.service";
  import Addable from "./Addable";
  import Draggable from 'vuedraggable'

  export default {
    components: {
      List ,
      Editable ,
      Addable ,
      Draggable,
    },


    data () {
      return {
        board: null,
        lists: [] ,
        users: null,
        fromListIndex: null,
      };
    },
     created () {
       this.$eventBus.$on("list-dragend", this.onListDragEnd);
     } ,
    mounted () {
      boardService.findById(this.$route.params.boardId).then(
        (board => {
          this.$set(this , "board" , board);
          this.$set(this , "lists" , board.lists);
          this.$set(this , "users" , board.users);

        }).bind(this)
      );
    } ,
    methods: {
      editableSubmitted (inputText) {
        if (inputText === this.board.title) {
          return;
        }
        boardService.update(this.board._id , inputText).then(() => {
          this.board.title = inputText;
        })
      } ,
      addableSubmit (listTitle) {
        if (!listTitle || listTitle.length === 0) {
          return;
        }
        listService.create(this.board._id , listTitle).then((newList) => {
          this.board.lists.push(newList)
        })
      },
      onListDragEnd() {
        this.updateListsOrder();
      },
      updateListsOrder() {
        let listIds = this.lists.map(list => list._id);
        boardService.updateListsOrder(this.board._id, listIds);
      },
      log: function(evt) {
        window.console.log(evt);
      }
    },
  }
</script>

<style>
  .board-title .is-editing {
    background-color: #ffffff;
    color: #000000;
    padding: 8px;
    display: inline-block;
    min-width: 600px;
  }
  .add-new-list .is-editing {
    background-color: #ffffff;
    color: #000000;
    padding: 8px;
    margin: 0;
  }
</style>

<style scoped lang="scss">
  .add-new-list {
    display: inline-block;
    width: 270px;
  }
  .board-title {
    width: 300px;
    color: #ffffff;
    padding: 10px;
    height: 90px;
  }
  .board-page-main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .board-lists {
    flex-grow: 1;
    margin-bottom: 20px;
    position: relative;
  }
  .board-lists-inner {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: scroll;
    position: absolute;
    white-space: nowrap;
  }

  .addlist{
    background: white;
  }

  .assign-people{
    display: flex;
    flex-direction: row-reverse;
  }
</style>
