<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="" return="/home" />
                <div class="product-container">
                    <img :src="product?.image">
                    <div class="store-details">
                        <img :src="product?.store?.image">
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
                        <textarea name="observacoes" id="observacoes" placeholder="Ex. Sem cebola, adicionar guardanapo, etc."></textarea>
                    </div>
                    <div class="product-action">
                        <quantitySelectorComponent :currentQuantity="quantity" @updateQuantity="quantity = $event" />
                        <button class="btn btn-primary space-between" style="width: 200px;">
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

.store-details {
    display: flex;
    gap: var(--space-4);

    & img {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        border: 1px solid var(--white);
    }
}

.store-informations, .product-details, .product-observations {
    display: grid;
    gap: var(--space-3);
}

.product-action {
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 72px;
    padding: var(--space-6);
    width: 100vw;
    background: var(--ion-background-color);
}
</style>