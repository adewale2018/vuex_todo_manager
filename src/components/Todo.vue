<template>
  <div class="todo" @dblclick="onDblClick(todo)" :class="{ 'is-complete': todo.completed }">
    <span>{{ todo.title }}</span>
    <i class="far fa-trash-alt" @click="deleteTodo(todo.id)" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Todo",
  props: ["todo"],
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };
      this.updateTodo(updTodo);
    }
  }
};
</script>

<style scoped>
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
</style>
