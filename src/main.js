import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import styles from './styles/styles.scss';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  styles,
  vuetify,
  render: h => h(App)
}).$mount('#app')
