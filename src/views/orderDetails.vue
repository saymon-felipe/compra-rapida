<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent :title="'Pedido #' + order.id" return="/orders" />
                <div class="store-details">
                    <img :src="order.products[0].store.image" class="avatar">
                    <div class="store-informations">
                        <h3>{{ order.products[0].store.name }}</h3>
                    </div>
                </div>
                <div class="order-date">
                    <h3>Data</h3>
                    <p>{{ formatDate(order.date) }}</p>
                </div>
                <div class="cart-products">
                    <div class="cart-product" v-for="(product, index) in order.products" :key="index">
                        <img :src="product.image">
                        <div class="product-informations">
                            <h3>{{ product.name }}</h3>
                            <p>{{ product.description }}</p>
                            <h3 class="bold">{{ formatarParaReal(product.price) }}</h3>
                        </div>
                    </div>
                </div>
                <h3>Pagamento pelo app</h3>
                <div class="payment-methods">
                    <div class="payment-method" v-for="(method, index) in paymentMethods" :key="index">
                        <div class="method-informations">
                            <img :src="method.image">
                            <h3>{{ method.name }}</h3>
                        </div>
                    </div>
                </div>
                <div class="cart-summary">
                    <h3>Resumo</h3>
                    <div class="summary-item">
                        <p>Subtotal</p>
                        <p>{{ formatarParaReal(order.value) }}</p>
                    </div>
                    <div class="summary-item">
                        <p>Taxa de entrega</p>
                        <p :class="chooseItemDeliveryTaxClass(order.entrega)">{{ chooseItemDeliveryTax(order.entrega) }}</p>
                    </div>
                    <div class="summary-item">
                        <h3>Total</h3>
                        <h3 class="bold">{{ formatarParaReal(order.value) }}</h3>
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%;" v-on:click="repeatOrder(order)">
                    <span>Repetir pedido</span>
                </button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";
import pixImage from "../assets/img/pix.png";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent
    },
    data() {
        return {
            order: this.$route.params.order ? JSON.parse(this.$route.params.order) : {},
            paymentMethods: [
                {
                    id: 1,
                    image: pixImage,
                    name: "Pix"
                }
            ]
        }
    },
    watch: {
    },
    methods: {
        
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

.store-informations, .product-details, .product-observations, .order-date {
    display: grid;
    gap: var(--space-6);
}
</style>