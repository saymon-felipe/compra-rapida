<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Meus pedidos" return="/home" />
                <h3>Histórico</h3>
                <div class="empty" v-if="orders.length == 0">
                    <p>Nenhum pedido encontrado</p>
                </div>
                <div class="orders-container">
                    <div class="order" v-for="(order, index) in orders" :key="index">
                        <h3>{{ formatarDataPorExtenso(order?.date) }}</h3>
                        <div class="order-inner">
                            <div class="order-header">
                                <div class="store-details">
                                    <img :src="order?.products[0]?.store?.image" class="avatar">
                                    <p>{{ order?.products[0]?.store?.name }}</p>
                                </div>
                                <p>#{{ order?.id }}</p>
                            </div>
                            <div class="order-products">
                                <div class="product" v-for="(product, index2) in order.products" :key="index2">
                                    <p>
                                        <span>{{ product.quantity }}</span>&nbsp;
                                        <span>{{ product.name }}</span>
                                    </p>
                                </div>
                            </div>
                            <p v-on:click="repeatOrder(order)" class="repeat-order">Repetir pedido</p>
                        </div>
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
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent
    },
    data() {
        return {
            orders: []
        }
    },
    methods: {
        getOrders: function () {
            let self = this;
                
            this.api.get("app/orders").then((response) => {
                self.orders = response.data.returnObj;
            })
        },
        repeatOrder: async function (order) {
            let cart = this.getCart();

            if (cart.length > 0) {
                const alert = await alertController.create({
                    header: 'Carrinho com itens',
                    message: 'Tem certeza que deseja limpar o carrinho para repetir o pedido?',
                    buttons: [
                        {
                            text: 'Limpar',
                            role: 'limpar'
                        },
                        {
                            text: 'Cancelar',
                            role: 'cancelar'
                        }
                    ]
                });

                await alert.present();
                const result = await alert.onWillDismiss();
                
                if (result.role === 'limpar') {
                    this.clearCart();
                } else {
                    return;
                }
            }
            
            for (let i = 0; i < order.products.length; i++) {
                let product = order.products[i];
                this.addToCart(product, product.quantity);
            }

            this.$router.push("/cart");
        }
    },
    mounted: function () {
        this.verifyAuth().then(() => {
            this.getOrders();
        }).catch();
    }
})
</script>
<style scoped>
.orders-container {
    margin: var(--space-6) 0;
    display: grid;
    gap: var(--space-8);
}

.order, .order-products {
    display: grid;
    gap: var(--space-4);
}

.order-products {
    margin-left: 52px;
}

.order-inner {
    border-radius: var(--radius-md);
    border: 1px solid var(--white);
    padding: var(--space-5);
}

.order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.repeat-order {
    text-align: center;
    margin-top: var(--space-6);
    color: var(--orange) !important;
    cursor: pointer;
}
</style>