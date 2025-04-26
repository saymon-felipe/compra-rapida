<template>
    <header class="return-component">
        <ion-icon name="chevron-back" v-on:click="goBack()"></ion-icon>
        <h2>{{ title }}</h2>
    </header>
    
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["title", "return"],
    data() {
        return {
            
        }
    },
    watch: {
    },
    methods: {
        goBack: function () {
            if (this.return) {
                this.$router.push(this.return);
            } else {
                this.$router.back();
            }
        }
    }
})
</script>
<style scoped>
header {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-3);
    background: var(--ion-background-color);
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

    & ion-icon {
        font-size: var(--fontsize-lg);
        font-weight: bold;
    }

    & h2 {
        margin: 0;
        font-weight: 600;
    }
}
</style>