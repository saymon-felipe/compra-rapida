<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Pagamento" return="/cart" />
                <div class="store-details" v-if="$localStorage.cart.length">
                    <img :src="$localStorage.cart[0].store.image" class="avatar">
                    <div class="store-informations">
                        <h3>{{ $localStorage.cart[0].store.name }}</h3>
                    </div>
                </div>
                <div class="cart-products">
                    <div class="cart-product" v-for="(product, index) in $localStorage.cart" :key="index">
                        <img :src="product.image">
                        <div class="product-informations">
                            <h3>{{ product.name }}</h3>
                            <p>{{ product.description }}</p>
                            <h3 class="bold">{{ formatarParaReal(product.price) }}</h3>
                        </div>
                    </div>
                </div>
                <div class="shipping">
                    <h3>Entrega</h3>
                    <addressItemComponent :address="address" />
                </div>
                <h3>Pagamento pelo app</h3>
                <div class="payment-methods">
                    <div class="payment-method" v-for="(method, index) in paymentMethods" :key="index">
                        <div class="method-informations">
                            <img :src="method.image">
                            <h3>{{ method.name }}</h3>
                        </div>
                        <ion-icon name="sync" class="change-method" v-if="false" v-on:click="handleChangeAddressBeforeContinue"></ion-icon>
                    </div>
                </div>
                <div class="cart-summary">
                    <h3>Resumo</h3>
                    <div class="summary-item">
                        <p>Subtotal</p>
                        <p>{{ formatarParaReal(cartItemsSum()) }}</p>
                    </div>
                    <div class="summary-item">
                        <p>Taxa de entrega</p>
                        <p :class="chooseItemDeliveryTaxClass($localStorage.cart[0]?.delivery_tax)">{{ chooseItemDeliveryTax($localStorage.cart[0]?.delivery_tax) }}</p>
                    </div>
                    <div class="summary-item">
                        <h3>Total</h3>
                        <h3 class="bold">{{ formatarParaReal(cartItemsSum()) }}</h3>
                    </div>
                </div>
                <div class="product-action">
                    <button class="btn btn-primary" style="width: 100%;" v-on:click="confirmOrder()" :dataLoading="loadingStyle">
                        <span>{{ orderStatusButton }}</span>
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
import pixImage from "../assets/img/pix.png";
import { alertController } from '@ionic/vue';
import addressItemComponent from "../components/addressItemComponent.vue";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent,
        addressItemComponent
    },
    data() {
        return {
            paymentMethods: [
                {
                    id: 1,
                    image: pixImage,
                    name: "Pix"
                }
            ],
            orderStatusButton: "Confirmar pedido",
            address: this.getSelectedAddress()
        }
    },
    methods: {
        confirmOrder: function () {
            this.loadingButton = true;
            this.orderStatusButton = "Enviando pedido";

            let self = this;

            let data = self.$getCart().map((product) => {
                return {
                    id: product.id,
                    quantidade: product.quantity,
                    observacoes: product.observations
                }
            })

            this.api.post("app/orders", { products: data, address_id: this.address.id }).then((response) => {
                setTimeout(() => {
                    self.loadingButton = false;
                    
                    setTimeout(() => {
                        self.$router.push({
                            name: "FollowOrder",
                            params: {
                                address: JSON.stringify(response.data.returnObj.address),
                                id: response.data.returnObj.id
                            }
                        });

                        self.clearCart({ forceClear: true });
                    }, 400)
                }, 3000)
            }).catch(async (error) => {
                self.loadingButton = false;
                self.orderStatusButton = "Erro ao enviar pedido";

                const alert = await alertController.create({
                    header: 'Ops... Erro ao enviar pedido',
                    message: 'Ocorreu um erro ao tentarmos incluir o seu pedido. Por favor tente novamente em alguns minutos.',
                    buttons: [
                        {
                            text: 'OK'
                        }
                    ]
                });

                await alert.present();
                self.orderStatusButton = "Confirmar pedido";
            })
        }
    },
    mounted: function () {
        this.verifyAuth();
    }
})
</script>
<style scoped>
</style>