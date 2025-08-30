<template>
    <div class="address-selector" v-on:click="$emit('changeAddress')">
        <div class="selected-address" v-if="selectedAddress?.id">{{ selectedAddress.address }}, {{ selectedAddress.number }}</div>
        <div class="selected-address" v-if="$usuario.id && !selectedAddress?.id && (addressList && addressList.length == 0)">Cadastrar endereço</div>
        <div class="selected-address" v-if="$usuario.id && !selectedAddress?.id && (addressList && addressList.length != 0)">Selecionar endereço</div>
        <div class="selected-address" v-if="!$usuario.id && !selectedAddress?.id && (addressList && addressList.length == 0)">Fazer login</div>
        <ion-icon name="chevron-down"></ion-icon>
    </div>
</template>
<script>
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["selectedAddress", "addressList"],
    components: {
        IonIcon
    },
    data() {
        return {
        }
    },
    watch: {
        "$usuario": {
            handler() {
                setTimeout(() => {
                    this.checkIfAddressIsValidInLocalStorage();
                }, 1000)
            },
            deep: true
        }
    },
    methods: {
        checkIfAddressIsValidInLocalStorage: function () {
            let selectedAddress = this.getSelectedAddress();

            if (!this.addressList?.length || (selectedAddress?.id && !this.addressList.some(address => address.id === selectedAddress.id))) {
                this.removeSelectedAddress();
            }
        }
    },
    mounted: function () {
        
    }
})
</script>
<style scoped>
.address-selector {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: auto;
    justify-content: center;
    cursor: pointer;
}

.selected-address {
    max-width: 60vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>