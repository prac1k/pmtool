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
              <div class="card-title">{{ card.title }}</div>
              <div class="card-body">{{ card.body }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="card-title"@click="isOpen = !isOpen;">{{ card.title }} {{ isOpen ? "" : "" }}</div>
    <div class="card-body" @click="isOpen = !isOpen;">{{ card.body }} {{ isOpen ? "" : "" }}</div>
    </div>

</template>

<script>

  export default {
    props: [
      "cardProp",
      "listProp",
      "index"
    ],
    data() {
      return {
        isOpen: false,
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
  button {
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



</style>
