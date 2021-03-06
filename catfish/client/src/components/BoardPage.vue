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
      <div class="assign-people" >
        <div class="assignedUserAva"> Assigned users:
        <VueAvatar  :size="30" v-for="user in assignedUsers" :src="user.avatar" :key="user._id" :username='user.name + " " + user.lastname' :tooltip='user.name + " " + user.lastname'>
        </VueAvatar>
        </div>
      </div>
      <div>
      <div>
        <vSelect class="assign-select" :options="selectOptions" v-model="selected" @input="onUsersClickAdd" placeholder="Start typing to add user...">
              {{selectedOption}}

            </vSelect>
        </div>
      </div>
      <div class="board-lists">
        <addable
          class="add-new-list"
          @addable-submit="addableSubmit">
          <div class="addlist">Add list</div>
        </addable>
        <draggable v-model='lists' @start="drag=true" @end="drag=false" >
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
  import userService from "../services/user.service";
  import Addable from "./Addable";
  import Draggable from 'vuedraggable'
  import { BFormSelect } from 'bootstrap-vue'
  import authenticationService from '../services/authentication.service'
  import vSelect from "vue-select"
  import VueAvatar from '@lossendae/vue-avatar'

  export default {
    components: {
      List ,
      Editable ,
      Addable ,
      Draggable,
      BFormSelect,
      vSelect,
      VueAvatar,
    },

    computed:{
      selectOptions(){
      return this.users.map(d => ({label: d.name + " " + d.lastname, value: d.id}))
  },
      selectedOption(){
        if (this.selected)
          return this.selected.value
        else
          return null
      },
},

    data () {
      return {
        user: authenticationService.currentUserValue.name,
        assignedUsers: [],
        selected: null,
        board: null,
        lists: [],
        fromListIndex: null,
        users: [],
              };
    },
     created () {
       this.$eventBus.$on("list-dragend", this.onListDragEnd);
       userService.getAll().then(users => this.users = users);
       boardService.findById(this.$route.params.boardId).then(
         (board => {
           this.$set(this , "board" , board);
           this.$set(this , "lists" , board.lists);
           this.$set(this , "assignedUsers" , board.users.map(d => ({name: d.name, lastname: d.lastname, avatar: d.avatar})));
         }).bind(this)

       );

     } ,
    mounted () {
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
      onUsersClickAdd(){
        this.boardAssignUsers();
      },
      updateAssignedusers(){
        boardService.findById(this.$route.params.boardId).then(
          (board => {
            this.$set(this , "board" , board);
            this.$set(this , "lists" , board.lists);
            this.$set(this , "assignedUsers" , board.users.map(d => ({name: d.name, lastname: d.lastname, avatar: d.avatar})));
          }).bind(this)
        );

      },
      boardAssignUsers(){
        let userIds = this.selected.value;
        boardService.boardAssignUsers(this.board._id, userIds).then(res => this.updateAssignedusers()) ;
      },
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

  .assign-people {
    flex-direction: row-reverse;
    padding-left: 5px;
    width: 38.3%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: fixed;
    height: 45px;
    top: 60px;
  }
    .assign-people:hover{
      display: table;
      flex-direction: row-reverse;
      padding-left: 5px;
      width: 100%;
      white-space: nowrap;
      overflow: visible;
      position: fixed;
      height: 45px;
      top: 60px;
    }
    .assign-select{
      position: fixed;
      top: 82px;
      right: 15px;
    }
    .vs__actions{
      display: none;
    }
  .vs__selected{
    position: fixed;
  }
  [tooltip]:before {
    position : absolute;
    content : attr(tooltip);
    opacity : 0;
    text-decoration-color: black;
  }
  [tooltip]:after{
    color:#fff;
  }

  [tooltip]:hover:before {
    opacity : 1;
  }

  [tooltip]:not([tooltip-persistent]):before {
    pointer-events: none;
    color: black;
    postion: fixed;
    top: 15%;
    padding-left: 5px;
  }
  .assignedUserAva{
    padding:7px;
    margin: 1px;
    display: flex;
    flex-flow: row wrap;
  }
  .vue-avatar{
    margin: 3px;
  }
  .vue-avatar-span{
    display: none;
  }

</style>

