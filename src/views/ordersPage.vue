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
                    <div v-for="(ordersByDate, date) in groupedOrders" :key="date">
                        <h3>{{ date }} {{ isToday(ordersByDate[0].date) }}</h3>
                        <div class="order" v-for="(order, index) in ordersByDate" :key="index" v-on:click="goToOrderDetails(order)">
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
                                <p class="in-progress" v-if="order.in_progress == 1">Em andamento</p>
                            </div>
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
            orders: [],
            groupedOrders: {} // Novo objeto para os pedidos agrupados por data
        }
    },
    methods: {
        goToOrderDetails: function (order) {
            if (order) {
                this.$router.push({
                    name: 'Order',
                    params: {
                        order: JSON.stringify(order)
                    }
                });
            }
        },
        getOrders: function () {
            this.api.get("app/orders").then((response) => {
                this.orders = response.data.returnObj;
                this.groupedOrders = this.groupOrdersByDate(this.orders); // Chama a função para agrupar os pedidos
            });
        },
        groupOrdersByDate: function (orders) {
            const grouped = {};
            orders.forEach(order => {
                const date = this.formatarDataPorExtenso(order.date);
                if (!grouped[date]) {
                    grouped[date] = [];
                }
                grouped[date].push(order);
            });
            return grouped;
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

    & > div {
        display: grid;
        gap: var(--space-4);
    }
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

    & .in-progress {
        margin-left: 3.2rem;
        margin-top: 1.5rem;
        color: var(--orange) !important;
    }
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