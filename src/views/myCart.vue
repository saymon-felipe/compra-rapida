<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Carrinho" return="/home" />
                <div class="cart-header">
                    <h3>Itens adicionados</h3>
                    <h3 class="orange bold" v-on:click="clearCart()" v-if="carrinho.length">Limpar</h3>
                </div>
                <div class="store-details" v-if="carrinho.length">
                    <img :src="carrinho[0].store.image" class="avatar">
                    <div class="store-informations">
                        <h3>{{ carrinho[0].store.name }}</h3>
                    </div>
                </div>
                <div class="empty" v-else>
                    <p>Nenhum produto adicionado</p>
                </div>
                <div class="cart-products">
                    <div class="cart-product" v-for="(product, index) in carrinho" :key="index">
                        <img :src="product.image">
                        <div class="product-informations">
                            <h3>{{ product.name }}</h3>
                            <p>{{ product.description }}</p>
                            <h3 class="bold">{{ formatarParaReal(product.price) }}</h3>
                        </div>
                        <quantitySelectorComponent :currentQuantity="product.quantity" :allowZeroQuantity="true" @exclude="removeFromCart(product.id)" @updateQuantity="product.quantity = $event; saveCart()" />
                    </div>
                </div>
                <storeCheckStand />
                <div class="cart-summary">
                    <h3>Resumo</h3>
                    <div class="summary-item">
                        <p>Subtotal</p>
                        <p>{{ formatarParaReal(cartItemsSum()) }}</p>
                    </div>
                    <div class="summary-item">
                        <p>Taxa de entrega</p>
                        <p :class="chooseItemDeliveryTaxClass(carrinho[0]?.delivery_tax)">{{ chooseItemDeliveryTax(carrinho?.delivery_tax) }}</p>
                    </div>
                    <div class="summary-item">
                        <h3>Total</h3>
                        <h3 class="bold">{{ formatarParaReal(cartItemsSum()) }}</h3>
                    </div>
                </div>
                <div class="product-action">
                    <button class="btn btn-primary space-between" style="width: 100%;" v-on:click="goToSelectAddress()" :disabled="carrinho.length == 0">
                        <span>Continuar</span>
                        <span>{{ formatarParaReal(cartItemsSum()) }}</span>
                    </button>
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
import storeCheckStand from "../components/storeCheckStand.vue";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent,
        quantitySelectorComponent,
        storeCheckStand
    },
    data() {
        return {
            carrinho: {}
        }
    },
    methods: {
        goToSelectAddress: function () {
            this.$router.push("/select-address?value=" + encodeURIComponent(this.cartItemsSum()));
        }
    },
    mounted: function () {
        let self = this;

        this.verifyAuth().then(() => {
            self.carrinho = self.getCart();
        }).catch();
    }
})
</script>
<style scoped>
.empty {
    width: 100%;
    margin-top: var(--space-6);
    text-align: center;
}

.cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-4);
}

.cart-products {
    display: grid;
    gap: var(--space-6);
    padding: var(--space-4) 0;
}

.cart-product {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    overflow: hidden;
    max-width: 100%;  

    & img {
        width: 70px;
        height: 70px;
        border-radius: var(--radius-md);
        flex-shrink: 0;
    }

    & .quantity-component {
        flex-shrink: 0;
        width: fit-content; 
    }
}

.product-informations {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;

    & p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: var(--space-3);
    }
}

.cart-summary {
    display: grid;
    gap: var(--space-6);
    margin-bottom: var(--space-4);

    & .summary-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

</style>