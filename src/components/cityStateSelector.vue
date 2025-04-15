<template>
    <div class="estado-cidade-select">
      <div class="form-group">
        <label for="estado">Estado</label>
        <select id="estado" v-model="selectedState" @change="onStateChange" required>
          <option disabled value="">* Selecione *</option>
          <option v-for="estado in estados" :key="estado.id" :value="estado.sigla">
            {{ estado.nome }}
          </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="cidade">Cidade</label>
        <select id="cidade" v-model="selectedCity" :disabled="!cidades.length" required>
          <option disabled value="">* Selecione *</option>
          <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">
            {{ cidade.nome }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      state: String,
      city: String
    },
    emits: ['update:state', 'update:city'],
    data() {
      return {
        selectedState: '',
        selectedCity: '',
        estados: [],
        cidades: []
      };
    },
    watch: {
      selectedState(newVal) {
        this.$emit('update:state', newVal);
      },
      selectedCity(newVal) {
        this.$emit('update:city', newVal);
      },
      state(newVal) {
        if (newVal && newVal !== this.selectedState) {
          this.selectedState = newVal;
          this.fetchCities(newVal);
        }
      },
      city(newVal) {
        if (newVal && newVal !== this.selectedCity && this.cidades.length) {
          this.selectedCity = newVal;
        }
      }
    },
    async mounted() {
      const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      this.estados = data.sort((a, b) => a.nome.localeCompare(b.nome));
  
      if (this.state) {
        this.selectedState = this.state;
        await this.fetchCities(this.state);
        if (this.city) {
          this.selectedCity = this.city;
        }
      }
    },
    methods: {
      async fetchCities(sigla) {
        this.selectedCity = '';
        this.cidades = [];
  
        if (!sigla) return;
  
        const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
        this.cidades = data.sort((a, b) => a.nome.localeCompare(b.nome));
  
        // Se a cidade já foi passada, seleciona ela
        if (this.city && this.cidades.some(c => c.nome === this.city)) {
          this.selectedCity = this.city;
        }
      },
      onStateChange() {
        this.fetchCities(this.selectedState);
      }
    }
  };
  </script>
  