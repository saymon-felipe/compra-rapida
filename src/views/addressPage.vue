<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <div class="address-selector-container">
                    <div class="address-selector-item" v-for="(address, index) in addressList" :key="index" :class="{ 'selected': selectedAddress.id === address.id }" @click="selectedAddress = address">
                        <div class="address-informations">
                            <div class="address-name">{{ address.name }}</div>
                            <div class="address-item">{{ address.address }}, {{ address.number }} {{ address.neighborhood != "" ? "- " + address.neighborhood : "" }}, {{ address.city }} - {{ address.state }}</div>
                            <div class="address-complement">{{ address.complement }}</div>
                        </div>
                        <div class="address-actions">
                            <ion-icon name="pencil"></ion-icon>
                            <ion-icon name="trash"></ion-icon>
                        </div>
                    </div>
                    <div class="address-selector-item" v-if="addressList.length === 0">
                        <div class="address-item">Nenhum endereço encontrado</div>
                    </div> 
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonContent,
        IonPage
    },
    data() {
        return {
            selectedAddress: {
                id: 1,
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
                    id: 1,
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
                    id: 2,
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

    }
})
</script>