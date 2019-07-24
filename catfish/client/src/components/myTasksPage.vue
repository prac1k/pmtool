<template>
  <div>
    <b-table striped hover :items="items" :fields="fields" :to={}></b-table>
  </div>
</template>

<script>
    import { TablePlugin } from 'bootstrap-vue'
    import { BTable } from 'bootstrap-vue'
    export default {
        components: {
            TablePlugin,
            BTable
        },

        data() {
            return {
                // Note `isActive` is left out and will not appear in the rendered table
                fields: ['Project', 'Assignee', 'Task'],
                items: [
                    { isActive: true, Project: 40, Assignee: 'Dickerson', Task: 'Macdonald' },
                    { isActive: false, Project: 21, Assignee: 'Larsen', Task: 'Shaw' },
                    { isActive: false, Project: 89, Assignee: 'Geneva', Task: 'Wilson' },
                    { isActive: true, Project: 38, Assignee: 'Jami', Task: 'Carney' }
                ]
            }
        }
    }
</script>
