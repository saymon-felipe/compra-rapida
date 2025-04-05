<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
  <footerComponent />
</template>

<script setup>
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import footerComponent from "./components/footerComponent.vue";
</script>
