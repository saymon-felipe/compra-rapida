<template>
    <div class="quantity-component">
        <ion-icon name="remove-circle" v-on:click="sub()"></ion-icon>
        <p>{{ currentQuantity }}</p>
        <ion-icon name="add-circle" class="add" v-on:click="add()"></ion-icon>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["currentQuantity", "allowZeroQuantity"],
    emits: ["updateQuantity", "exclude"],
    data() {
        return {
            quantity: JSON.parse(JSON.stringify(this.currentQuantity))
        }
    },
    methods: {
        sub: function () {
            if (!this.allowZeroQuantity && this.quantity <= 1) return;
            if (this.allowZeroQuantity && this.quantity == 1) {
                this.$emit("exclude");
            }

            if (this.quantity <= 1) return;

            if (this.quantity > 1) {
                this.quantity--;
            }

            this.$emit("updateQuantity", this.quantity);
        },
        add: function () {
            this.quantity++;
            
            this.$emit("updateQuantity", this.quantity);
        }
    }
})
</script>
<style scoped>
.quantity-component {
    display: flex;
    gap: var(--space-6);
    align-items: center;

    & p {
        font-size: var(--fontsize-sm);
    }

    & ion-icon {
        font-size: var(--fontsize-lg);
    }
}

.add {
    color: var(--secondary);
}
</style>