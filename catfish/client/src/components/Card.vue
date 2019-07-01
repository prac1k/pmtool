<template>
  <div
    v-if="card"
    class="list-card"
    :class="{'is-dragging-card': isDraggingCard, 'drag-entered': dragEntered}"
    draggable="true"
    @dragstart="onCardDragStart(index, $event)"
    @dragend="onCardDragEnd"
    @drop="onCardDrop(index)"
    @dragover.prevent
    @dragover="onCardDragOver"
    @dragleave="onCardDragLeave"
  >
    <div class="card-title">{{ card.title }}</div>
    <div class="card-body">{{ card.body }}</div>
  </div>
</template>

<script>
  import Card from "./Card"
  import cardService from "../services/card.service"
  import listService from "../services/list.service"


  export default {
    props: [
      "cardProp",
      "listProp",
      "index"
    ],
    data() {
      return {
        card: null,
        list: null,
        isDraggingCard: false,
        dragEntered: false
      };
    },
    mounted() {
      this.$set(this, "card", this.cardProp);
      this.$set(this, "list", this.listProp);
    },
    methods: {
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
      onCardDragOver (event) {
        this.$set(this, "dragEntered", true)
      },
      onCardDragLeave (index, list) {
        this.$set(this, "dragEntered", false)
      },
      onCardDrop (toIndex) {
        this.$set(this, "dragEntered", false)
        this.$eventBus.$emit("card-dropped", toIndex)
      },

    },
  };
</script>

<style scoped lang="scss">
  .card-body{

  }
  .card-title {
    text-decoration: underline;
    z-index: 1;
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
</style>
