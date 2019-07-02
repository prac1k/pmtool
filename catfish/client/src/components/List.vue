<template>
   <div
    class="board-list"
    :class="{'is-dragging-list': isDraggingList, 'drag-entered': dragEntered}"
    draggable="true"
    @dragstart="onListDragStart(index, $event)"
    @dragend="onListDragEnd"
    >
    <div class="list-inner">
      <div
        v-if="list"
        class="list-title">
        <h3>
          {{ list.title }}
        </h3>
        <div>
          <addable
            class="add-new-card"
            @addable-submit="addableSubmit">
            <div class="addcard">+ Add Card</div>
          </addable>
        </div>
      </div>
      <div class="list-cards">
        <draggable v-model='cards' @start="drag=true" @end="drag=false" @change="log" :options="{ group: 'list'}">
        <card
          v-for="(card, i) in cards"
          :card-prop="card"
          :key="card._id"
          :index="card._id"
        />
        </draggable>
       </div>
     </div>
    </div>
</template>

<script>
  import Card from "./Card"
  import cardService from "../services/card.service"
  import Addable from "./Addable";
  import Draggable from 'vuedraggable'


  export default {

    components: {
      Card ,
      Addable ,
      Draggable ,
    } ,
    props: [
      "cardProp" ,
      "listProp" ,
      "index"
    ] ,
    data () {
      return {
        list: [] ,
        cards: [] ,
        lists:[],
        isDraggingList: false ,
        dragEntered: false ,
        fromCardIndex: null ,
      }
    } ,

    created () {
       this.$eventBus.$on("card-dragend", this.onCardDragEnd);
  },

    mounted () {
      this.$set(this, "list", this.listProp)
       this.$set(this, "cards", JSON.parse(JSON.stringify(this.listProp.cards)))
    },

    methods: {
      addableSubmit (cardTitle) {
        if (!cardTitle || cardTitle.length === 0) {
          return;
        }
        cardService.create(this.list._id , cardTitle).then((newCard) => {
          console.log("listID card create:" , this.list._id);
          this.cards.push(newCard);
        })
      } ,

      onListDragStart (fromIndex , event) {
        if (!fromIndex) {
          fromIndex = 0
        }
        this.$set(this , "isDraggingList" , true)
        this.$eventBus.$emit("list-drag-started" , fromIndex)
      } ,
      onListDragEnd () {
        this.$set(this , "isDraggingList" , false)
        this.$eventBus.$emit("list-dragend")
      } ,
      onCardDragEnd () {
        this.updateCardsOrder();
              } ,
      updateCardsOrder () {
        let cardIds = this.cards.map(card => card._id);
        cardService.updateCardsOrder(this.list._id , cardIds);
      } ,
      log: function(evt) {
        window.console.log(evt);
      }
    },
  }
</script>

<style>
  .list-title .is-editing {
    background-color: #ffffff;
    color: #000000;
  }
</style>

<style scoped lang="scss">
  .list-inner {
    background-color: #dfe3e6;
    padding: 10px;
    white-space: normal;
    border-radius: 3px;
    z-index: 0;
  }
  .board-list {
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: top;
    width: 270px;
    max-height: 100%;
    overflow-y: scroll;
    &.is-dragging-list {
      transform: rotate(1deg)
    }
    &.drag-entered {
      border: 3px solid #237bda;
    }
  }
</style>
