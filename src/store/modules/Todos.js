import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  fetchTodos: async function({ commit }) {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("SET_TODOS", response.data);
  },
  addTodo: async function({ commit }, title) {
    let res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      id: uuidv4(),
      completed: false,
    });
    commit("ADD_TODO", res.data);
  },
  deleteTodo: async function({ commit }, todoId) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    commit("REMOVE_TODO", todoId);
  },
};

const mutations = {
  SET_TODOS: function(state, todos) {
    return (state.todos = todos);
  },
  ADD_TODO: function(state, todo) {
    return (state.todos = [todo, ...state.todos]);
  },
  REMOVE_TODO: function(state, todoId) {
    return (state.todos = state.todos.filter((td) => td.id !== todoId));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
