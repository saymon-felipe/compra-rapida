<template>
  <ion-app>
    <ion-router-outlet />
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

<style>
ion-content {
    background-image: linear-gradient(to bottom right, var(--black), var(--black-2));
}
</style>
