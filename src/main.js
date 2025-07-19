import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

GoogleAuth.initialize({
  clientId: '670063294865-jc0num1k9cs0atgvpbd9rkl61t302hq9.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
})

import { defineCustomElements } from 'ionicons/dist/loader';

const iconMap = {};
for (const key in allIcons) {
  const kebab = key
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/Outline$/, '-outline')
    .replace(/Sharp$/, '-sharp')
    .toLowerCase();
  iconMap[kebab] = allIcons[key];
}

addIcons(iconMap);

// Core CSS required for Ionic components to work properly
import '@ionic/vue/css/core.css';
// Basic CSS for apps built with Ionic
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
// Optional CSS utils that can be commented out
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
// Theme variables
import './theme/variables.css';
// Global CSS
import './css/global.css';

import vCep from './directives/v-cep';

const app = createApp(App).use(IonicVue).use(router);

app.directive('cep', vCep);

import formatterMixin from './mixins/formmatter';
import globalMixin from './mixins/global';
import apiApp from './plugins/api';

app.mixin(formatterMixin);
app.mixin(globalMixin);
app.use(apiApp);

app.config.globalProperties.$usuario = reactive({
  id: null
})

app.config.globalProperties.$selectedAddress = reactive({ id: null });

app.config.globalProperties.$getCart = function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let carrinhoUsuario = cart.find(c => c.id_usuario === this.$usuario.id);

  return carrinhoUsuario ? carrinhoUsuario.produtos : [];
}

app.config.globalProperties.$localStorage = reactive({ cart: app.config.globalProperties.$getCart() });

app.config.globalProperties.$watchLocalStorage = function () {
  let lastCart = JSON.stringify(JSON.parse(localStorage.getItem('cart')) || []);

  setInterval(() => {
    const rawCart = JSON.stringify(JSON.parse(localStorage.getItem('cart')) || []);

    if (rawCart !== lastCart) {
      lastCart = rawCart;
      app.config.globalProperties.$localStorage.cart = app.config.globalProperties.$getCart();
    }
  }, 200);
};

app.config.globalProperties.$watchLocalStorage();

router.isReady().then(() => {
  app.mount('#app');
  defineCustomElements(window);
  app.config.globalProperties.$watchLocalStorage();
});
