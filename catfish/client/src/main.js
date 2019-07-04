// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from 'axios'
import eventBus from './event-bus/index'
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
Vue.prototype.$eventBus = eventBus
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})






