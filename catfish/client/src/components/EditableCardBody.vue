<template>
  <div>
    <h2
      v-show="isEditing"
      ref="editableField"
      :class="{'is-editing': isEditing}"
      contenteditable="true"
      @keydown.enter="submit"
      @blur="onBlur"
      @keydown.esc="escape"
    >{{ cardBody }}</h2>
    <template v-if="isEditing === false">
      <div @click="onCardBodyClick()">
        <slot
          :isEditing="isEditing"
          :cardBody="cardBody"/>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: ["fieldValue"],
    data() {
      return {
        cardBody: "",
        isEditing: false
      };
    },
    mounted() {
      this.$set(this, "cardBody", this.fieldValue);
    },
    methods: {
      onCardBodyClick() {
        this.$set(this, "isEditing", true);
        setTimeout((() => {
          this.$refs.editableField.focus()
        }).bind(this), 200)
      },
      submit(event) {
        this.$set(this, "cardBody", event.currentTarget.innerText)
        this.$emit("editable-submit-body", event.currentTarget.innerText)
        this.$set(this, "isEditing", false);
      },
      escape(event) {
        this.$set(this, "cardBody", event.currentTarget.innerText)
        this.$emit("editable-submit-body", event.currentTarget.innerText);
        this.$set(this, "isEditing", false);
      },
      onBlur (event) {
        this.$set(this, "cardBody", event.currentTarget.innerText)
        this.$emit("editable-submit-body", event.currentTarget.innerText);
        this.$set(this, "isEditing", false);
      }
    }
  };
</script>
