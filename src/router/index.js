import { createRouter, createWebHistory } from '@ionic/vue-router';
import homePage from '../views/homePage.vue';
import addressPage from '../views/addressPage.vue';
import addAddress from '../views/addAddress.vue';
import productDetails from '../views/productDetails.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: homePage
  },
  {
    path: '/set-address',
    name: 'SetAddress',
    component: addressPage
  },
  {
    path: '/add-address',
    name: 'AddAddress',
    component: addAddress
  },
  {
    path: '/product-details/:product',
    name: 'ProductDetails',
    component: productDetails
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
