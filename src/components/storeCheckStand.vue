<template>
    <div class="store-products">
        <div class="product" v-for="(product, index) in storeProducts" :key="index" v-on:click="goToProductDetails(product)">
            <img :src="product.image">
            <div class="product-informations">
                <h3>{{ product.name }}</h3>
                <p>{{ formatarParaReal(product.price) }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["store"],
    data() {
        return {
            storeProducts: []
        }
    },
    methods: {
        getStoreProducts: function () {
            let store = [
                {
                    id: 0,
                    name: "Pizza Napolitana",
                    description: "Massa fina, molho de tomate, queijo e manjericão",
                    price: 11.50,
                    estimated_time: "15-35 min",
                    delivery_tax: 0,
                    distance: 1,
                    image: "https://avenidab2c.vtexassets.com/arquivos/ids/349944/Pizza-Congelada-Napolitana-PERDIGAO-460g.png?v=638624752101500000",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
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
                    distance: 1,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdmSkBosFYD5uF3FL28l9kPgwO_kpKwPUxA&s",
                    store: {
                        id: 3,
                        name: "Condor",
                        image: "https://media.licdn.com/dms/image/v2/C4E0BAQEOPqP2OYrElw/company-logo_200_200/company-logo_200_200/0/1630628066378/condor_super_center_ltda_logo?e=2147483647&v=beta&t=5neUSB6P3EHWHEanBOmqqTvRcNVlvv3S7Z1IUnIdLBM"
                    }
                }
            ]

            this.storeProducts = store;
        }
    },
    mounted: function () {
        this.getStoreProducts();
    }
}
</script>
<style scoped>
.store-products {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    overflow-x: auto;
    margin: var(--space-4) 0;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    margin-left: -16px;
    width: calc(100% + 32px);

    & .product {
        min-width: 0;
        overflow: hidden;
        display: grid;
        gap: var(--space-3);
        min-width: 100px;

        &:first-child {
            margin-left: 16px;
        }

        & .product-informations {
            display: grid;
            gap: var(--space-2);
        }
    }

    & img {
        width: 100px;
        height: 100px;
        border-radius: var(--radius-md);
    }

    & h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100px;
    }
}
</style>