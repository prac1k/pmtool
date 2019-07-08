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
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="card-title"@click="isOpen = !isOpen;">{{ card.title }} {{ isOpen ? "" : "" }}</div>
    <div class="card-body" @click="isOpen = !isOpen;">{{ isOpen ? "" : "" }}</div>
    <div class="card-assignfront" @click="isOpen = !isOpen;">Assigned by: {{card.assignedBy}}</div>
    <div class="card-assignfront" @click="isOpen = !isOpen;">Assignee: </div>
  </div>

</template>

<script>
  import authenticationService from '../services/authentication.service';
  import userService from '../services/user.service';
  import Card from "./Card"
  import cardService from "../services/card.service"
  import EditableCardTitle from "./EditableCardTitle";
  import EditableCardBody from "./EditableCardBody";
  import { Editor, EditorContent } from 'tiptap';
  export default {

    components: {
      Card ,
      Editor ,
      EditableCardTitle ,
      EditableCardBody ,
      EditorContent ,
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
        scrolled: false ,
        isOpen: false ,
        card: null ,
        list: null ,
        isDraggingCard: false ,
        dragEntered: false ,
        editor: null ,
      };
    } ,
    mounted () {
      this.$set(this , "card" , this.cardProp);
      this.$set(this , "list" , this.listProp);
      this.$set(this , "user" , this.user);
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
    } ,
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
        this.$set(this, "isDraggingCard", true)
        this.$eventBus.$emit("card-drag-started", fromIndex)
      },
      onCardDragEnd () {
        this.$set(this, "isDraggingCard", false)
        this.$eventBus.$emit("card-dragend")
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
</style>
