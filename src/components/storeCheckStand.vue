<template>
    <div class="store-check-stand-container">
        <h3>Peça também</h3>
        <div class="store-products">
            <div class="product" v-for="(product, index) in storeProducts" :key="index" v-on:click="goToProductDetails(product)">
                <img :src="product.image">
                <div class="product-informations">
                    <h3>{{ product.name }}</h3>
                    <p>{{ formatarParaReal(product.price) }}</p>
                </div>
            </div>
            <h3 class="empty" v-if="storeProducts.length == 0">Nenhum produto disponível</h3>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            storeProducts: []
        }
    },
    methods: {
        getStoreProducts: function () {
            let self = this;

            this.api.post("app/products?from=cart", { products: self.getCart() }).then((results) => {
                let products = results.data.returnObj;

                self.storeProducts = products;
            })
        }
    },
    mounted: function () {
        this.getStoreProducts();
    }
}
</script>
<style scoped>
.store-check-stand-container {
    & > h3 {
        margin-bottom: var(--space-6);
    }
}

.empty {
    margin-left: 16px;
}

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
    min-height: 148px;

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

            & h3 {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100px;
            }
        }
    }

    & img {
        width: 100px;
        height: 100px;
        border-radius: var(--radius-md);
    }
}
</style>