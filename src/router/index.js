import Vue from 'vue';
import VueRouter from 'vue-router';
import Posters from '../views/Posters.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'posters',
    component: (Posters)
  },
  {
    path: '/film/:id',
    name: 'filmDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/FilmDetails.vue'),
    props: true,
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sessions.vue'),
    props: true,
  },
  {
    path: '/booking/:id',
    name: 'booking',
    component: () => import(/* webpackChunkName: "about" */ '../components/Booking.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../components/SearchResult.vue'),
    props: {name: '' , ganre: ''},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
