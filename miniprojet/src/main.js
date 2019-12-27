import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')
