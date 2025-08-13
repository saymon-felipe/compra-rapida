<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent :title="'Pedido #' + id" return="/orders" />
                <div class="follow-progress">
                    <h3>{{ order.status }}</h3>
                    <div class="progress-container">
                        <div class="progress-bar" :style="'width: ' + order.progress + '%;'"></div>
                    </div>
                </div>
                <div class="address">
                    <ion-icon name="locate"></ion-icon>
                    <addressItemComponent :address="address" />
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
            id: this.$route.params.id,
            order: {
                status: "Preparando pedido",
                progress: 1
            },
            address: JSON.parse(this.$route.params.address)
        }
    },
    methods: {
        getOrder: function () {
            setTimeout(() => {
                this.order = {
                    status: "Preparando pedido",
                    progress: 20
                }
            }, 1000)

            setTimeout(() => {
                this.getOrder();
            }, 60 * 1000)
        }
    },
    mounted: function () {
        this.verifyAuth().then(() => {
            this.getOrder();
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

.follow-progress {
    display: grid;
    gap: var(--space-5);
}

.progress-container {
    width: 100%;
    height: 10px;
    border-radius: var(--radius-md);
    background: var(--white);

    & .progress-bar {
        background: var(--green);
        height: 100%;
        width: 1px;
        transition: width 0.4s ease-in-out;
        border-radius: var(--radius-md);
    }
}
</style>