<template>
    <div class="filter">
        <ion-icon name="filter" v-on:click="toggleFilterContainer = !toggleFilterContainer"></ion-icon>
        <div class="filter-container" :class="toggleFilterContainer ? 'show' : 'hide'">
            <ul>
                <li v-on:click="filter('price')">Preço {{ currentSortOrder == "asc" ? "(Maior para menor)" : "(Menor para maior)" }}</li>
                <li v-on:click="filter('distance')">Distância {{ currentSortOrder == "asc" ? "(Maior para menor)" : "(Menor para maior)" }}</li>
            </ul>
        </div>
        <div class="filter-wrapper" v-if="toggleFilterContainer" v-on:touchstart="toggleFilterContainer = !toggleFilterContainer"></div>
    </div>
</template>
<script>
export default {
    props: ["filtered"],
    emits: ["order"],
    data() {
        return {
            filteredData: [],
            currentSortType: null,
            currentSortOrder: 'asc',
            toggleFilterContainer: false
        }
    },
    watch: {
        filtered: function () {
            this.filteredData = JSON.parse(JSON.stringify(this.filtered));
        }
    },
    methods: {
        filter: function (type) {
            if (this.currentSortType === type) {
                this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.currentSortType = type;
                this.currentSortOrder = 'asc';
            }

            for (let i = 0; i < this.filteredData.length; i++) {
                let currentCategory = this.filteredData[i];

                currentCategory.items.sort((a, b) => {
                    let valueA = type === 'price' ? a.price : a.distance;
                    let valueB = type === 'price' ? b.price : b.distance;

                    if (this.currentSortOrder === 'asc') {
                        return valueA - valueB;
                    } else {
                        return valueB - valueA;
                    }
                });
            }

            this.toggleFilterContainer = !this.toggleFilterContainer;
            this.$emit("order", this.filteredData);
        }

    }
}
</script>
<style scoped>
.filter {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: var(--fontsize-md);

    & ion-icon {
        position: relative;
        z-index: 5;
    }
}

.filter-container {
    position: absolute;
    transition: visibility 0.4s ease-in-out, opacity 0.4s ease-in-out;
    visibility: visible;
    opacity: 1;
    top: 20px;
    z-index: 5;
    background-image: var(--ion-background-color);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: 2px 4px 15px rgba(255, 255, 255, 0.5);

    & ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: var(--fontsize-sm);

        & li {
            padding: var(--space-5) var(--space-6);

            &:hover {
                background: rgba(255, 255, 255, 0.4);
            }
        }
    }
}

.hide {
    visibility: hidden;
    opacity: 0;
}

.filter-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    z-index: 4;
}
</style>