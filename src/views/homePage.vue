<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <addressSelector @changeAddress="handleChangeAddress()" :selectedAddress="selectedAddress" :addressList="addressList" />
                <searchComponent v-model="searchString" placeholder="Buscar produto/categoria/loja" />
                <filterComponent :filtered="filteredCategories" @order="filteredCategories = $event" />
                <categoriesComponent :categories="filteredCategories" :isLoading="loading" />
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import addressSelector from '../components/addressSelector.vue';
import searchComponent from "../components/searchComponent.vue";
import categoriesComponent from "../components/categoriesComponent.vue";
import filterComponent from "../components/filterComponent.vue";
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        addressSelector,
        searchComponent,
        categoriesComponent,
        filterComponent
    },
    data() {
        return {
            selectedAddress: {
                id: null,
                address: "",
                neighborhood: "",
                city: "",
                state: "",
                zip_code: "",
                complement: "",
                number: null
            },
            addressList: [],
            searchString: "",
            filteredCategories: [],
            categories: [],
            loading: true
        }
    },
    watch: {
        searchString: function () {
            if (this.searchString.trim().length > 0) {
                this.filteredCategories = JSON.parse(JSON.stringify(this.categories)).filter((category) => {
                    // Verifica se a pesquisa é por categoria, loja ou produto
                    const isCategoryMatch = category.name.toLowerCase().includes(this.searchString.toLowerCase());
                    
                    // Filtra os itens dentro da categoria, se for uma pesquisa por produto ou loja
                    const filteredItems = category.items.filter(item => {
                        const isProductMatch = item.name.toLowerCase().includes(this.searchString.toLowerCase());
                        const isStoreMatch = item.store.name.toLowerCase().includes(this.searchString.toLowerCase());

                        return isProductMatch || isStoreMatch; // Se o item corresponder ao nome do produto ou da loja
                    });

                    // Se a pesquisa for por categoria, retorna a categoria com todos os itens
                    if (isCategoryMatch) {
                        return true;
                    }

                    // Se a pesquisa for por loja ou produto, retorna a categoria com os itens filtrados
                    if (filteredItems.length > 0) {
                        category.items = filteredItems; // Mantém apenas os itens filtrados
                        return true;
                    }

                    return false;
                });
            } else {
                this.filteredCategories = this.categories;
            }

        }
    },
    methods: {
        returnAddresses: function () {
            let self = this;

            this.api.get("app/addresses").then((response) => {
                let addresses = response.data.returnObj;

                self.addressList = addresses;

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
        },
        returnCategories: function () {
            let self = this;

            this.api.post("app/products").then((results) => {
                let categories = results.data.returnObj;

                self.categories = categories;
                self.filteredCategories = categories;
                self.$nextTick(() => {
                    self.loading = false;
                })
            })
        },
        handleChangeAddress: function () {
            this.$router.push("/set-address");
        }
    },
    mounted: function () {
        this.verifyAuth(true).then(() => {
            this.returnAddresses();
        }).catch();

        this.returnCategories();
    },
    created() {
        window.addEventListener('storage', this.handleStorageChange);
    },
    destroyed() {
        window.removeEventListener('storage', this.handleStorageChange);
    }
})
</script>