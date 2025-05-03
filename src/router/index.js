import { createRouter, createWebHistory } from '@ionic/vue-router';
import homePage from '../views/homePage.vue';
import addressPage from '../views/addressPage.vue';
import addAddress from '../views/addAddress.vue';
import productDetails from '../views/productDetails.vue';
import myCart from '../views/myCart.vue';
import selectAddress from '../views/selectAddress.vue';

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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: myCart
  },
  {
    path: '/select-address',
    name: 'SelectAddress',
    component: selectAddress
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
