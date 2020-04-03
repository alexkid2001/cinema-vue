import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const baseUrl = 'https://cinema-api-test.herokuapp.com/movies';
const sessionsUrl = 'https://cinema-api-test.herokuapp.com/movieShows';
const bookingUrl = 'https://cinema-api-test.herokuapp.com/bookingPlace';
const searchUrl = 'https://cinema-api-test.herokuapp.com/movies/find';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    movies: [],
    movie: {},
    sessions: [],
    searchResults: [],
    ganres: { 0: 'Action', 
              1: 'Adventures', 
              2: 'Comedy', 
              3: 'Drama', 
              4: 'Horror', 
              5: 'Westerns'
            },
  },
  mutations: {
    setMoviesToState: (state, payload) => {
      state.movies = payload;
    },
    setMovieToState: (state, payload) => {
      state.movie = payload;
    },
    setSessionsToState: (state, payload) => {
      state.sessions = payload;
    },
    setSearchResultToState: (state, payload) => {
      state.searchResults = payload;
    }
  },
  actions: {
    getAllMovies ({commit}) {
      axios.get(baseUrl)
        .then(resp => {
          commit('setMoviesToState', resp.data);
          return resp.data;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    },
    getMoviesById ({commit}, id) {
      axios.get(`${baseUrl}?id=${id}`)
        .then(resp => {
          commit('setMovieToState', resp.data);
          return resp.data;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    },
    getSessions ({commit}) {
      axios.get(sessionsUrl)
        .then(resp => {
          commit('setSessionsToState', resp.data);
          console.log(resp.data);
          return resp.data;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    },
    bookingPlace: async ({ commit }, params) => {
      console.log(commit);

      return  await axios.post(bookingUrl, params);
    },
    searchMovies ({commit}, params) {
      axios.get(`${searchUrl}?name=${params.name}&genres=${params.ganre}`, params)
        .then(resp => {
          commit('setSearchResultToState', resp.data);
          console.log(resp.data);
          return resp.data;
        })
        .catch(err => console.error(err));
    }
  },
  modules: {
  },
  getters:{
    movies (state) {
      return state.movies;
    },
    sessions (state) {
      return state.sessions;
    },
    searchResult (state) {
      return state.searchResults;
    },
    ganres (state) {
      return state.ganres;
    }
  }
})