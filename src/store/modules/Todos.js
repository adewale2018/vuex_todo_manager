import axios from "axios";

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
      completed: false,
    });
    commit("ADD_TODO", res.data);
  },
};

const mutations = {
  SET_TODOS: function(state, todos) {
    return (state.todos = todos);
  },
  ADD_TODO: function(state, todo) {
    return state.todos = [todo, ...state.todos];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
