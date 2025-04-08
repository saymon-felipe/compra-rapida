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

<style>
ion-content {
    background-image: linear-gradient(to bottom right, var(--black), var(--black-2));
}
</style>
