<template>
    <div class="address-informations">
        <p class="address-name">{{ address.name }}</p>
        <div class="address-item">{{ address.address }}, {{ address.number }}</div>
        <p class="address-complement">{{ address.complement ? (address.complement + ",") : "" }} {{ address.city }}</p>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["address"],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted: function () {
    }
})
</script>
<style scoped>
    .address-name {
        margin-bottom: var(--space-3);
        font-weight: bold;
    }

    .address-item {
        margin-bottom: var(--space-3);
    }
</style>