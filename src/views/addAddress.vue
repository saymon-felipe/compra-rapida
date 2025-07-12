<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Cadastrar endereço" />
                <form @submit.prevent="addAddress">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" placeholder="Ex. Casa, trabalho" id="name" maxlength="255" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Endereço</label>
                        <input type="text" id="address" maxlength="255" v-model="address" required>
                    </div>
                    <div class="form-group">
                        <label for="number">Número</label>
                        <input type="text" id="number" v-model="number" required>
                    </div>
                    <div class="form-group">
                        <label for="complement">Complemento</label>
                        <input type="text" id="complement" maxlength="255" v-model="complement">
                    </div>
                    <div class="form-group">
                        <label for="cep">CEP</label>
                        <input type="text" id="cep" v-model="cep" v-cep required pattern="\d{5}-\d{3}" placeholder="00000-000"  maxlength="9" @cepFound="onCepFound">
                    </div>
                    <cityStateSelector @update:state="state = $event" @update:city="city = $event" :city="city" :state="state" />
                    <button type="submit" class="btn btn-primary w-100" style="margin-top: var(--space-10);">{{ isEdit ? "Salvar" : "Cadastrar" }}</button>
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
import { alertController } from '@ionic/vue';

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
            city: "",
            number: "",
            name: ""
        }
    },
    computed: {
        isEdit() {
            return this.$route.params.address != {};
        },
        currentAddress() {
            return this.isEdit ? JSON.parse(this.$route.params.address) : "";
        }
    },
    methods: {
        fillEditAddress: function () {
            let urlAddress = this.currentAddress;
            
            if (urlAddress != "") {
                this.address = urlAddress.address;
                this.complement = urlAddress.complement;
                this.cep = urlAddress.zip_code;
                this.state = urlAddress.state;
                this.city = urlAddress.city;
                this.number = urlAddress.number;
                this.name = urlAddress.name;
            }
        },
        onCepFound(event) {
            const data = event.detail;
            
            this.address = data.logradouro;
            this.complement = data.complemento;
            this.city = data.localidade;
            this.state = data.uf;
        },
        addAddress: function () {
            let self = this;
            let data = {
                id: this.currentAddress.id || null,
                address: this.address,
                complement: this.complement,
                cep: this.cep,
                state: this.state,
                city: this.city,
                number: this.number,
                name: this.name
            }            

            let method = this.isEdit ? "patch" : "post";

            this.api[method]("app/addresses", data).then(() => {
                self.$router.back();
            }).catch(() => {
                alertController.create({
                    header: 'Erro ao criar o endereço',
                    message: 'Tente novamente em alguns minutos.',
                    buttons: [
                        {
                            text: 'Voltar'
                        }
                    ]
                });
            })
        }
    },
    mounted: function () {
        let self = this;

        this.verifyAuth().then(() => {
            self.fillEditAddress();    
        }).catch();
    }
})
</script>
<style scoped>
</style>