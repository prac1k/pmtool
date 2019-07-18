<template>
  <div
    v-if="card"
    class="list-card"
    draggable="true"
    @dragstart="onCardDragStart(index, $event)"
    @dragend="onCardDragEnd"
  >
    <div>
      <transition name="modal">
        <div v-if="isOpen">
          <div class="overlay" @click.self="isOpen = false;">
            <div class="modal">
              <!-- Card Title Start  -->
              <div class="card-title">
                <EditableCardTitle
                  v-slot:default="slotProps"
                  :field-value="card.title"
                  @editable-submit="editableSubmitted"
                >
                  <h5>Title:</h5><h2>{{ slotProps.inputText }}</h2>
                </EditableCardTitle>
              </div>
              <!-- Card Title Ends  -->
              <!-- Card Description Start  -->
              <div class="card-body">
                <EditableCardBody
                  v-slot:default="cardBodyProp"
                  :field-value="card.body"
                  @editable-submit-body="editableBodySubmitted"
                >
                  <h5>Description:</h5><h2>{{ cardBodyProp.cardBody }}</h2>
                  <!--                v-slot:default="slotProps"-->
                  <!--                :field-value="card.body"-->
                  <!--                @editable-submit="editableSubmitted"-->
                  <!--                <editor>-->
                  <!--                  <div slot="card.body" slot-scope="props">-->
                  <!--              <editor-content :editor="editor" />&lt;!&ndash;  <h2>{{ slotProps.inputText }}</h2>&ndash;&gt;-->
                  <!--                  </div>-->
                  <!--                </editor>-->

                </EditableCardBody>
                           </div>
               <!-- Card Description Ends  -->
              <!--  Assign user -->
              <div class="card-assignfront">
                <h5>Assigned users:</h5>
                <div class="assignedUserAva">
                  <VueAvatar :size="25"  v-for="user in this.assignedTo" :src="user.avatar" :key="user._id" :username='user.name + " " + user.lastname' :tooltip='user.name + " " + user.lastname'>
                  </VueAvatar>
                </div>
              </div>
            <div>
              <div>
                <vSelect class="assign-select" :options="selectOptions" v-model="selected" @input="onUsersCardClickAdd" @change="onUsersCardClickAdd" placeholder="Start typing to add user...">
                  {{selectedOption}}
                </vSelect>
              </div>
            </div>
              <!--  Assign user ENDS-->
            </div>
            </div>
          </div>
      </transition>
    </div>
    <div class="card-title"@click="isOpen = !isOpen;">{{ card.title }} {{ isOpen ? "" : "" }}</div>
    <div class="card-body" @click="isOpen = !isOpen;">{{ isOpen ? "" : "" }}</div>
    <div class="card-assignfront" @click="isOpen = !isOpen;">Assigned by: {{card.assignedBy}}</div>
    <div class="card-assignfront" @click="isOpen = !isOpen;">Assignee:
      <div class="assignedUserAva">
        <VueAvatar  :size="20" v-model="assignedTo" v-for="user in assignedTo" :src="user.avatar" :key="user._id" :username='user.name + " " + user.lastname' :tooltip='user.name + " " + user.lastname'>
          </VueAvatar>
      </div>
  </div>
  </div>
</template>

<script>
  import authenticationService from '../services/authentication.service';
  import boardService from '../services/board.service';
  import Card from "./Card"
  import cardService from "../services/card.service"
  import EditableCardTitle from "./EditableCardTitle";
  import EditableCardBody from "./EditableCardBody";
  import { Editor, EditorContent } from 'tiptap';
  import { BFormSelect } from 'bootstrap-vue'
  import vSelect from "vue-select"
  import VueAvatar from '@lossendae/vue-avatar'
  export default {

    components: {
      Card ,
      Editor ,
      EditableCardTitle ,
      EditableCardBody ,
      EditorContent ,
      BFormSelect,
      vSelect,
      VueAvatar,
    } ,

    props: [
      "cardProp" ,
      "cardBodyProp" ,
      "listProp" ,
      "index" ,
    ] ,


    data () {
      return {
        user: authenticationService.currentUserValue,
        users: [],
        scrolled: false,
        isOpen: false,
        card: null,
        list: null,
        isDraggingCard: false,
        dragEntered: false,
        editor: null,
        selected: null,
        assignedUsers: [],
        assignedTo: null,
        board: null,
        lists: [],
      };
    } ,

    computed:{

      selectOptions(){
        return this.board.users.map(d => ({label: d.name + " " + d.lastname, value: d.id}));
              },
      selectedOption(){
        if (this.selected)
          return this.selected.value
        else
          return null
      },
    },
    created() {
      this.card = this.cardProp;
      this.list = this.listProp;
      this.assignedTo = this.card.assignedTo.map(d => ({name: d.name , lastname: d.lastname , avatar: d.avatar}));
      console.log("created", this.assignedTo );

      boardService.findById(this.$route.params.boardId).then(
        (board => {
          this.board = board;
          this.lists= board.lists.cards;
        }).bind(this)
      );
      //this.$set(this , "card" , this.cardProp);
      // this.$set(this , "assignedTo" , this.cardProp.assignedTo.map(d => ({name: d.name, lastname: d.lastname, avatar: d.avatar})));

      },

    mounted () {
      //this.$set(this , "assignedTo" , cardService.findById(this.card._id).then(this.card.assignedTo.map(d => ({name: d.name, lastname: d.lastname, avatar: d.avatar}))));

            // this.editor = new Editor({
      //   onFocus: ({event , state , view}) => {
      //     console.log(event , state , view)
      //   },
      //   content: '<p>Click to input task description</p>',
      // }),
      //   beforeDestroy()
      // {
      //   this.editor.destroy()
      // }
    },


    methods: {
      //title update
      editableSubmitted (inputText) {
        if (inputText === this.card.title) {
          return;
        }
        cardService.updateCardTitle(this.card._id , inputText).then(() => {
          this.card.title = inputText;
        })
      },

      //body update
      editableBodySubmitted (cardBody) {
        if (cardBody === this.card.body) {
          return;
        }
        cardService.updateCardBody(this.card._id , cardBody).then(() => {
          this.card.body = cardBody;
        })
      },

      onCardDragStart (fromIndex, event) {
        if (!fromIndex) {
          fromIndex = 0
        }
        this.isDraggingCard = true;
        this.$eventBus.$emit("card-drag-started", fromIndex)
      },
      onCardDragEnd () {
        this.isDraggingCard = false
        this.$eventBus.$emit("card-dragend")
      },
      onUsersCardClickAdd(){
        this.cardAssignToUsers();
      },

      cardAssignToUsers(){
        let assignUserIds = this.selected.value;
        cardService.cardAssignToUsers(this.card._id, assignUserIds).then(res => this.updateAssignedToUsers()) ;
      },
      updateAssignedToUsers(){
      cardService.findByIdCard(this.card._id).then(
        (card => {
          this.card = card;
          this.assignedTo = this.card.assignedTo.map(d => ({name: d.name , lastname: d.lastname , avatar: d.avatar}));
        })
        );
       console.log("updateAssignedToUsers", this.card);

      },
    },
  };
</script>

<style scoped lang="scss">
  .card-body{

  }
  .card-title {
    z-index: 1;
    font-weight: bolder;
  }
  .list-card {
    background-color: #ffffff;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 10px;
    z-index: 1;

    &.is-dragging-card {
      transform: rotate(1deg);
    }
    &.drag-entered {
      border: 3px solid crimson;
      z-index: 1;
    }
  }
  .modal {
    width: 500px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px 3px;
    transition: all 0.2s ease-in;
    font-family: Helvetica, Arial, sans-serif;
  }
  .fadeIn-enter {
    opacity: 0;
  }

  .fadeIn-leave-active {
    opacity: 0;
    transition: all 0.2s step-end;
  }

  .fadeIn-enter .modal,
  .fadeIn-leave-active.modal {
    transform: scale(1.1);
  }
  .button {
    padding: 7px;
    margin-top: 10px;
    background-color: green;
    color: white;
    font-size: 1.1rem;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000094;
    z-index: 999;
    transition: opacity 0.2s ease;
  }
.card-assignfront{
  padding-top:15px;
}
  .assign-people {
    display: inline-flex;
    flex-direction: row-reverse;
    padding-left: 5px;
    width: 18.3%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: fixed;
    height: 45px;
    top: 60px;
  }
  .assign-people:hover{
    display: inline-flex;
    flex-direction: row-reverse;
    padding-left: 5px;
    width: 75%;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
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
    right: 10px;
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
  .vs__search{
    position: fixed;
    top: 56%;
    right: 35%;
  }
  .v-select.assign-select.vs--single.vs--searchable{
    position: fixed;
    top: 58%;
    right: 35%;
  }

  .v-select.assign-select.vs--single.vs--open.vs--searchable{
    position: fixed;
    margin-top:10px;
    top: 58%;
    right: 35%;
    background: white;
    border: 1px solid;
    height: 10%;
    white-space: normal;
    overflow: auto;
    text-overflow: fade;
  }
</style>
