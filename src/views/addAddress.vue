<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Cadastrar endereço" />
                <form @submit.prevent="addAddress">
                    <div class="form-group">
                        <label for="address">Endereço</label>
                        <input type="text" id="address" v-model="address" required>
                    </div>
                    <div class="form-group">
                        <label for="complement">Complemento</label>
                        <input type="text" id="complement" v-model="complement">
                    </div>
                    <div class="form-group">
                        <label for="cep">CEP</label>
                        <input type="text" id="cep" v-model="cep" v-cep required pattern="\d{5}-\d{3}" placeholder="00000-000" @cep-found="onCepFound">
                    </div>
                    <cityStateSelector @update:state="state = $event" @update:city="city = $event" :city="city" :state="state" />
                    <button type="submit" class="btn btn-primary w-100" style="margin-top: var(--space-10);">Cadastrar</button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";
import cityStateSelector from "../components/cityStateSelector.vue";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent,
        cityStateSelector
    },
    data() {
        return {
            address: "",
            complement: "",
            cep: "",
            state: "",
            city: ""
        }
    },
    methods: {
        onCepFound(event) {
            const data = event.detail;
            console.log('Endereço via CEP:', data);

            // Preencher campos automaticamente
            this.address = data.logradouro;
            this.complement = data.complemento;
            this.city = data.localidade;
            this.state = data.uf;
        },
        addAddress: function () {
            let data = {
                address: this.address,
                complement: this.complement,
                cep: this.cep,
                state: this.state,
                city: this.city
            }

            console.log(data)

            this.$router.back();
        }
    },
    mounted: function () {
        this.fillAddresses();
    }
})
</script>
<style scoped>
</style>