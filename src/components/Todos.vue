<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as completed</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
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
    ...mapActions(["fetchTodos"])
  },
  computed: mapGetters(["allTodos"]),
  created: function() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
