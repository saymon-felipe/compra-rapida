import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

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

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './css/global.css';

import vCep from './directives/v-cep';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

  app.directive('cep', vCep);
  
app.mixin({
  data() {
    return {
      
    }
  }
})

router.isReady().then(() => {
  app.mount('#app');
});