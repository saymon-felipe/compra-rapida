<template>
    <div class="footer-container">
        <div class="menu-item" v-on:click="goToHome()">
            <ion-icon name="home"></ion-icon>
            <p class="text-sm-2">Início</p>
        </div>
        <div class="menu-item" v-on:click="goToCart()">
            <ion-icon name="cart"></ion-icon>
            <p class="text-sm-2">Carrinho</p>
        </div>
        <div class="menu-item" v-on:click="goToOrders()">
            <ion-icon name="bag"></ion-icon>
            <p class="text-sm-2">Pedidos</p>
        </div>
    </div>
</template>
<script>
import { IonIcon } from "@ionic/vue";
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonIcon },
    methods: {
        goToHome: function () {
            this.$router.push("/home");
        },
        goToCart: function () {
            this.$router.push("/cart");
        },
        goToOrders: function () {
            this.$router.push("/orders");
        }
    }
})
</script>
<style scoped>
.footer-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-image: linear-gradient(to right, var(--orange), var(--orange-2));
    padding-top: 1rem;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

    .menu-item p, .menu-item ion-icon {
        color: var(--white);
    }

    .menu-item ion-icon {
        font-size: 1.5rem;
    }
</style>