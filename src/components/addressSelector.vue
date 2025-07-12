<template>
    <div class="address-selector" v-on:click="$emit('changeAddress')">
        <div class="selected-address" v-if="selectedAddress?.id">{{ selectedAddress.address }}, {{ selectedAddress.number }}</div>
        <div class="selected-address" v-if="selectedAddress == undefined">Cadastrar endereço</div>
        <div class="selected-address" v-if="selectedAddress && !selectedAddress.id">Fazer login</div>
        <ion-icon name="chevron-down"></ion-icon>
    </div>
</template>
<script>
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["selectedAddress"],
    components: {
        IonIcon
    },
    data() {
        return {
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
.address-selector {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: auto;
    justify-content: center;
    cursor: pointer;
}
</style>