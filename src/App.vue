<template>
  <ion-app>
    <ion-router-outlet :key="keyToForceReload" />
  </ion-app>
  <footerComponent />
</template>

<script setup>
  import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
  import footerComponent from "./components/footerComponent.vue";
  import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

  if (!isPlatform("capacitor")) {
    GoogleAuth.initialize();
  }
</script>
<script>
export default {
  data() {
    return {
      keyToForceReload: 0
    };
  },
  watch: {
    '$route.fullPath': {
      handler(newPath, oldPath) {
        this.keyToForceReload++;
      },
      immediate: true
    }
  },
  mounted: function () {
    this.verifyAuth(true);

    setInterval(() => {
      this.verifyAuth(true);
    }, 60 * 1000)
  }
}
</script>

<style>
ion-content {
    background-image: linear-gradient(to bottom right, var(--black), var(--black-2));
}
</style>
