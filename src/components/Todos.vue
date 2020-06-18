<template>
  <div>
    <h3>Todos</h3>
    <div class="todos">
      <Todo v-for="todo in allTodos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Todo from "./Todo";

export default {
  name: "Todos",
  components: { Todo },
  methods: {
    ...mapActions(["fetchTodos"]),
  },
  computed: mapGetters(["allTodos"]),
  created: function() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

</style>
