import { createRouter, createWebHistory } from '@ionic/vue-router';
import homePage from '../views/homePage.vue';
import addressPage from '../views/addressPage.vue';
import addAddress from '../views/addAddress.vue';
import productDetails from '../views/productDetails.vue';
import myCart from '../views/myCart.vue';
import selectAddress from '../views/selectAddress.vue';
import paymentDetails from '../views/paymentDetails.vue';
import followOrder from '../views/followOrder.vue';
import ordersPage from '../views/ordersPage.vue';
import loginPage from '../views/loginPage.vue';
import orderDetails from '../views/orderDetails.vue';

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
    path: '/add-address/:address',
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
  },  
  {
    path: '/payment-details',
    name: 'PaymentDetails',
    component: paymentDetails
  },  
  {
    path: '/follow-order/:address:id',
    name: 'FollowOrder',
    component: followOrder
  },  
  {
    path: '/orders',
    name: 'Orders',
    component: ordersPage
  },  
  {
    path: '/order/:order',
    name: 'Order',
    component: orderDetails
  }, 
  {
    path: '/login',
    name: 'Login',
    component: loginPage
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
