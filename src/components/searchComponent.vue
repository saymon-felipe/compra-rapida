<template>
    <div class="input-search">
      <ion-icon name="search"></ion-icon>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="modelValue"
      />
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    props: {
      modelValue: String, // padrão do v-model
      placeholder: String
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const modelValue = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val)
      });
  
      return {
        modelValue
      };
    }
  });
  </script>
  
  <style scoped>
  .input-search {
    margin-bottom: var(--space-10);
    position: relative;
  
    & ion-icon {
      font-size: var(--fontsize-md);
      color: var(--orange);
      position: absolute;
      top: 0;
      bottom: 0;
      display: grid;
      place-items: center;
      height: 100%;
      left: var(--space-3);
    }
  
    & input {
      padding-left: 2.5rem !important;
    }
  }
  </style>
  