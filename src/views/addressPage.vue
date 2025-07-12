<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Endereço de entrega" return="/home" />
                <searchComponent v-model="searchString" placeholder="Procurar endereço" />
                <div class="address-selector-container">
                    <div class="address-selector-item" v-for="(address, index) in filteredAddressList" :key="index" :class="{ 'selected': selectedAddress.id === address.id }" v-on:click="selectedAddress = address">
                        <addressItemComponent :address="address" />
                        <div class="address-actions">
                            <ion-icon name="pencil" v-on:click="editAddress(address)"></ion-icon>
                            <ion-icon name="trash" v-if="addressList.length > 1"></ion-icon>
                        </div>
                    </div>
                    <div class="address-selector-item" v-if="addressList.length === 0">
                        <div class="address-item">Nenhum endereço encontrado</div>
                    </div> 
                </div>
                <button class="btn btn-primary w-100" v-on:click="$router.push({
                    name: 'AddAddress',
                    params: {
                        address: {}
                    }
                });">Cadastrar</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";
import searchComponent from "../components/searchComponent.vue";
import addressItemComponent from "../components/addressItemComponent.vue";
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent,
        searchComponent,
        addressItemComponent
    },
    watch: {
        searchString: function () {
            if (this.searchString.trim().length > 0) {
                this.filteredAddressList = this.addressList.filter((address) => {
                    return address.name.toLowerCase().includes(this.searchString.toLowerCase()) || address.address.toLowerCase().includes(this.searchString.toLowerCase()) || address.neighborhood.toLowerCase().includes(this.searchString.toLowerCase()) || address.city.toLowerCase().includes(this.searchString.toLowerCase()) || address.state.toLowerCase().includes(this.searchString.toLowerCase()) || address.zip_code.includes(this.searchString);
                });
            } else {
                this.filteredAddressList = this.addressList;
            }
        },
        selectedAddress: function () {
            let url = new URLSearchParams(window.location.search);
            let redirect = url.get("redirect");

            localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));

            if (redirect == "cart") {
                this.$router.push("/select-address");
            }
        }
    },
    data() {
        return {
            searchString: "",
            selectedAddress: {},
            filteredAddressList: [],
            addressList: []
        }
    },
    methods: {
        editAddress: function (address) {
            this.$router.push({
                name: 'AddAddress',
                params: {
                    address: JSON.stringify(address)
                }
            });
        },
        fillAddresses: function () {
            let self = this;

            this.api.get("app/addresses").then((response) => {
                let addresses = response.data.returnObj;

                self.addressList = addresses;
                self.filteredAddressList = addresses;

                let selectedAddress = localStorage.getItem("selectedAddress");
                
                self.selectedAddress = selectedAddress ? JSON.parse(selectedAddress) : self.addressList [0];
            }).catch(() => {
                alertController.create({
                    header: 'Erro ao retornar a lista de endereços',
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
        this.verifyAuth().then(() => {
            this.fillAddresses();
        }).catch();
    }
})
</script>
<style scoped>
    .address-selector-container {
        display: grid;
        gap: var(--space-6);
        margin-bottom: var(--space-10);
    }

    .address-selector-item {
        width: 100%;
        border: 1px solid var(--white);
        padding: var(--space-6);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
    }

    .selected {
        border-color: var(--orange);
    }

    .address-actions {
        display: grid;
        gap: var(--space-8);

        & ion-icon {
            font-size: var(--fontsize-md);
            display: grid;
            place-items: center;
            cursor: pointer;

            &:last-child {
                color: var(--orange);
            }
        }
    }
</style>