import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
  filterTodos: async function({ commit }, e) {
    //get the selected number
    // const limit  = e.target.options[e.target.options.selectedIndex].text;
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("SET_TODOS", response.data);
  },
  updateTodo: async function({ commit }, updateTodo) {
    let res = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/8`,
      updateTodo
    );
    commit("UPDATE_TODO", res.data);
    console.log("FROM UPDATE REQUEST", res.data);
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
  UPDATE_TODO: function(state, updateTodo) {
    const index = state.todos.findIndex((todo) => todo.id === updateTodo.id);
    if (index !== -1) {
      return (state.todos = state.todos.splice(index, 1, updateTodo));
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
