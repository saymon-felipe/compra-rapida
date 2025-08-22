<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Entrega" return="/cart" />
                <h3>Entregar no endereço</h3>
                <div class="address">
                    <ion-icon name="locate"></ion-icon>
                    <addressItemComponent :address="address" />
                    <ion-icon name="sync" class="change-address" v-on:click="handleChangeAddressBeforeContinue"></ion-icon>
                </div>
                <div class="product-action">
                    <button class="btn btn-primary space-between" style="width: 100%;" v-on:click="goToPaymentDetails()">
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
            address: {}
        }
    },
    methods: {
        handleChangeAddressBeforeContinue: function () {
            this.$router.push("/set-address?redirect=cart");
        },
        fillSelectedAddress: function () {
            let selectedAddress = this.getSelectedAddress();

            if (!selectedAddress.id) {
                this.$router.push("/set-address?redirect=cart");
            } else {
                this.address = selectedAddress;
            }
        },
        goToPaymentDetails: function () {
            this.$router.push("/payment-details");
        }
    },
    mounted: function () {
        this.verifyAuth().then(() => {
            let url = new URLSearchParams(window.location.search);
            let value = url.get("value");

            if (value) {
                this.value = decodeURIComponent(value);
            }

            this.fillSelectedAddress();
        }).catch();
    }
})
</script>
<style scoped>
.address {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    margin-top: var(--space-6);

    & .address-informations {
        flex: 1;
    }

    & ion-icon {
        font-size: 2rem;
    }
}

.change-address {
    color: var(--secondary);
    cursor: pointer;
}
</style>