<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <addressSelector @changeAddress="handleChangeAddress()" :selectedAddress="selectedAddress" :addressList="addressList" />
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import addressSelector from '../components/addressSelector.vue';
import $ from 'jquery';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        addressSelector
    },
    data() {
        return {
            selectedAddress: {
                address: "R. Brasholanda",
                neighborhood: "Weissópolis",
                city: "Pinhais",
                state: "PR",
                zip_code: "83322070",
                complement: "Bloco 1 Ap 21",
                number: 556
            },
            addressList: [
                {
                    name: "Casa",
                    address: "R. Brasholanda",
                    neighborhood: "Weissópolis",
                    city: "Pinhais",
                    state: "PR",
                    zip_code: "83322070",
                    complement: "Bloco 1 Ap 21",
                    number: 556
                },
                {
                    name: "Trabalho",
                    address: "R. Brasholanda",
                    neighborhood: "Weissópolis",
                    city: "Pinhais",
                    state: "PR",
                    zip_code: "83322070",
                    complement: "Bloco 1 Ap 22",
                    number: 557
                }
            ]
        }
    },
    watch: {
    },
    methods: {
        handleChangeAddress: function () {
            this.$router.push("/set-address");
        }
    }
})
</script>