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

  export default {
    props: [
      "cardProp",
      "index"
    ],
    data() {
      return {
        card: null,
        isDraggingCard: false,
        dragEntered: false
      };
    },
    mounted() {
      this.$set(this, "card", this.cardProp);
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
      onCardDragLeave (index, card) {
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
    z-index: 1;
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
      z-index: 1;
    }
    &.drag-entered {
      border: 3px solid crimson;
      z-index: 1;
    }
  }
</style>
