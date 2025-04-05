import { createRouter, createWebHistory } from '@ionic/vue-router';
import homePage from '../views/homePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: homePage
  }]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
