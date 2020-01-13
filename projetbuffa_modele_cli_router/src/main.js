import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import RestaurantList from "./components/RestaurantList.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import Home from "./components/Home.vue";

// configs...
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.use(VueRouter)

// config du router :
const router = new VueRouter({
  routes:[
    {
      path: '/',
      component: Home,
      props:{
        msg:" site des restaurants"
      }
    },
    {
      path: '/restaurants',
      component: RestaurantList
    },
    {
      path: '/restaurants/:id',
      component: RestaurantDetail
    },
  ],
  mode:'history'
});

new Vue({
  router,
  render: h => h(App), // si router pas de rendu de composant
}).$mount('#app')
