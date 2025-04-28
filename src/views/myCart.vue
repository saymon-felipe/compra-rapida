<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Carrinho" return="/home" />
                
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent
    },
    data() {
        return {
            
        }
    },
    methods: {
        getCart: function() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let carrinhoUsuario = cart.find(c => c.id_usuario === this.$id_usuario);

            return carrinhoUsuario ? carrinhoUsuario.produtos : [];
        }
    },
    mounted: function () {
        console.log(this.getCart());
    }
})
</script>
<style scoped>
</style>