import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import Admin from '../components/Admin.vue'
import Details from '../components/Details.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    }
  ]
})
