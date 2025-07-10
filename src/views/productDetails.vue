<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="" return="/home" />
                <div class="product-container">
                    <img :src="product?.image">
                    <div class="store-details">
                        <img :src="product?.store?.image" class="avatar">
                        <div class="store-informations">
                            <h3>{{ product?.store?.name }}</h3>
                            <h3>{{ product?.estimated_time }}&nbsp;&nbsp;&nbsp;&nbsp;<span :class="chooseItemDeliveryTaxClass(product?.delivery_tax)">{{ chooseItemDeliveryTax(product?.delivery_tax) }}</span></h3>
                        </div>
                    </div>
                    <div class="product-details">
                        <h2>{{ product?.name }}</h2>
                        <h3 v-html="product?.description"></h3>
                    </div>
                    <div class="product-observations">
                        <h2>
                            <label for="observacoes">
                                <ion-icon name="chatbubble-ellipses"></ion-icon>
                                Observação?
                            </label>
                        </h2>
                        <textarea name="observacoes" id="observacoes" placeholder="Ex. Sem cebola, adicionar guardanapo, etc." @click="scrollToInput"></textarea>
                    </div>
                    <div class="product-action">
                        <quantitySelectorComponent :currentQuantity="quantity" @updateQuantity="quantity = $event" />
                        <button class="btn btn-primary space-between" style="width: 200px;" v-on:click="goToCart()">
                            <span>Adicionar</span>
                            <span>{{ formatarParaReal(product?.price * quantity) }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";
import quantitySelectorComponent from "../components/quantitySelectorComponent.vue";
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent,
        quantitySelectorComponent
    },
    data() {
        return {
            quantity: 1,
            product: this.$route.params.product ? JSON.parse(this.$route.params.product) : {}
        }
    },
    watch: {
    },
    methods: {
        goToCart: function () {
            let self = this;

            this.verifyAuth().then(async () => {
                const isAdded = self.addToCart(self.product, self.quantity);

                if (!isAdded) {
                    const alert = await alertController.create({
                        header: 'Ops... Loja diferente',
                        message: 'Você tentou adicionar um produto de uma loja diferente, limpe seu carrinho primeiro.',
                        buttons: [
                            {
                                text: 'Limpar',
                                handler: () => {
                                    self.clearCart();
                                    return 'limpar';
                                }
                            },
                            {
                                text: 'Cancelar',
                                handler: () => {
                                    return 'cancelar';
                                }
                            }
                        ]
                    });

                    await alert.present();
                    const result = await alert.onWillDismiss();
                    
                    if (result.data === 'limpar') {
                        self.clearCart();
                    }

                    self.$router.push("/cart");
                } else {
                    self.$router.push("/cart");
                }
            }).catch();
        }
    },
    mounted: function () {
        
    }
})
</script>
<style scoped>
.product-container {
    display: grid;
    gap: var(--space-8);
    padding-bottom: 100px;

    & > img {
        height: 27vh;
        width: 100%;
        object-fit: cover;
        border-radius: var(--radius-md);
    }
}

.store-informations, .product-details, .product-observations {
    display: grid;
    gap: var(--space-3);
}
</style>