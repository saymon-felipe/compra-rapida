<template>
  <div class="categories-container">
    <div class="category" v-for="(category, index) in categories" :key="index">
      <h3 class="bold">{{ category.name }}</h3>
      <div class="items-container">
        <div class="item" v-for="(item, index2) in category.items" :key="index2" v-on:click="goToProductDetails(item)">
          <div class="item-image-container">
            <img :src="item.store.image" class="store-image" />
            <img :src="item.image" class="item-image" />
            <div class="price">
              <span class="bold">{{ formmatCurrency(item.price) }}</span>
            </div>
          </div> 
          <div class="item-informations">
            <h3>{{ item.name }}</h3>
            <div class="item-delivery">
              <p>
                {{ item.estimated_time }}
                <span :class="chooseItemDeliveryTaxClass(item.delivery_tax)">
                  {{ chooseItemDeliveryTax(item.delivery_tax) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesList',
  props: {
    categories: Array
  },
  methods: {
  }
};
</script>

<style scoped>
.categories-container {
  display: grid;
  gap: var(--space-10);
}

.category {
  display: grid;
  gap: var(--space-5);
}

.items-container {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-4);
  margin-left: -16px;
  width: calc(100% + 32px);
}

.item {
  display: grid;
  gap: var(--space-3);
  flex: 0 0 auto;

  &:first-child {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }

  & .item-image-container {
    position: relative;
  }

  & .item-image {
    width: 200px;
    height: 150px;
    min-width: 200px;
    border-radius: var(--radius-md);
    object-fit: cover;
    background-color: var(--white);
  }

  & .store-image {
    width: 50px;
    height: 50px;
    border-radius: var(--radius-full);
    border: 2px solid var(--white);
    object-fit: cover;
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    z-index: 2;
    background-color: var(--white);
  }

  & .price {
    background: var(--green);
    width: fit-content;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    position: absolute;
    bottom: var(--space-4);
    left: -7px;
  }

  & .item-informations {
    display: grid;
    gap: var(--space-3);

    & p {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
  }
}
</style>
