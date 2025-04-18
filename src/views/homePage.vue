<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <addressSelector @changeAddress="handleChangeAddress()" :selectedAddress="selectedAddress" :addressList="addressList" />
                <searchComponent v-model="searchString" placeholder="Buscar produto/categoria/loja" />
                <categoriesComponent :categories="filteredCategories" />
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

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        addressSelector,
        searchComponent,
        categoriesComponent
    },
    data() {
        return {
            selectedAddress: {
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
            categories: []
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
            let addresses = [
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

            this.addressList = addresses;
            this.selectedAddress = addresses[0];
        },
        returnCategories: function () {
            let categories = [
                {
                    id: 0,
                    name: "Lanches",
                    items: [
                        {
                            id: 0,
                            name: "Omurice",
                            description: "Pão, carne, queijo, alface e tomate",
                            price: 25.00,
                            estimated_time: "45-55 min",
                            delivery_tax: 15.00,
                            image: "https://i.ytimg.com/vi/FCmfXqVJc6Q/maxresdefault.jpg",
                            store: {
                                name: "Nyan Maid Café",
                                image: "https://mms.img.susercontent.com/28b49029af37bae3af357b051dac6d97_tn"
                            }
                        },
                        {
                            id: 1,
                            name: "Choko Cake",
                            description: "Bolo de chocolate com recheio de morango",
                            price: 32.90,
                            estimated_time: "45-55 min",
                            delivery_tax: 17.90,
                            image: "https://i.pinimg.com/originals/22/3d/a2/223da29f5521c837d67b90727765bf1b.jpg",
                            store: {
                                name: "Chest of Wonders",
                                image: "https://chestmaids.carrd.co/assets/images/image01.png?v=7e41ed8a"
                            }
                        },
                        {
                            id: 1,
                            name: "Choko Cake",
                            description: "Bolo de chocolate com recheio de morango",
                            price: 32.90,
                            estimated_time: "45-55 min",
                            delivery_tax: 17.90,
                            image: "https://i.pinimg.com/originals/22/3d/a2/223da29f5521c837d67b90727765bf1b.jpg",
                            store: {
                                name: "Chest of Wonders",
                                image: "https://chestmaids.carrd.co/assets/images/image01.png?v=7e41ed8a"
                            }
                        },
                        {
                            id: 1,
                            name: "Choko Cake",
                            description: "Bolo de chocolate com recheio de morango",
                            price: 32.90,
                            estimated_time: "45-55 min",
                            delivery_tax: 17.90,
                            image: "https://i.pinimg.com/originals/22/3d/a2/223da29f5521c837d67b90727765bf1b.jpg",
                            store: {
                                name: "Chest of Wonders",
                                image: "https://chestmaids.carrd.co/assets/images/image01.png?v=7e41ed8a"
                            }
                        }
                    ]
                },
                {
                    id: 0,
                    name: "Condor - Av Iraí",
                    items: [
                        {
                            id: 0,
                            name: "Pizza Napolitana",
                            description: "Massa fina, molho de tomate, queijo e manjericão",
                            price: 11.50,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://avenidab2c.vtexassets.com/arquivos/ids/349944/Pizza-Congelada-Napolitana-PERDIGAO-460g.png?v=638624752101500000",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        },
                        {
                            id: 1,
                            name: "Vinho Tinto Bordô Suave",
                            description: "Vinho tinto suave, 750ml",
                            price: 25.90,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        }
                    ]
                },
                {
                    id: 0,
                    name: "Condor - Av Iraí",
                    items: [
                        {
                            id: 0,
                            name: "Pizza Napolitana",
                            description: "Massa fina, molho de tomate, queijo e manjericão",
                            price: 11.50,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://avenidab2c.vtexassets.com/arquivos/ids/349944/Pizza-Congelada-Napolitana-PERDIGAO-460g.png?v=638624752101500000",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        },
                        {
                            id: 1,
                            name: "Vinho Tinto Bordô Suave",
                            description: "Vinho tinto suave, 750ml",
                            price: 25.90,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        }
                    ]
                },
                {
                    id: 0,
                    name: "Condor - Av Iraí",
                    items: [
                        {
                            id: 0,
                            name: "Pizza Napolitana",
                            description: "Massa fina, molho de tomate, queijo e manjericão",
                            price: 11.50,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://avenidab2c.vtexassets.com/arquivos/ids/349944/Pizza-Congelada-Napolitana-PERDIGAO-460g.png?v=638624752101500000",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        },
                        {
                            id: 1,
                            name: "Vinho Tinto Bordô Suave",
                            description: "Vinho tinto suave, 750ml",
                            price: 25.90,
                            estimated_time: "15-35 min",
                            delivery_tax: 0,
                            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                            store: {
                                name: "Condor",
                                image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                            }
                        }
                    ]
                }
            ]

            this.categories = categories;
            this.filteredCategories = categories;
        },
        handleChangeAddress: function () {
            this.$router.push("/set-address");
        }
    },
    mounted: function () {
        this.returnAddresses();
        this.returnCategories();
        console.log(this.categories)
    }
})
</script>