<template>
    <ion-page>
        <ion-content class=ion-padding>
            <div class="page-content">
                <h1 class="header-text text-md">Rotear</h1>
                <div class="route-container">
                    <div class="route-container-header">
                        <p class="text-sm-bold">
                            Iniciar um roteador
                        </p>
                    </div>
                    <div class="create-route-steps">
                        <ol>
                            <li>
                                <p class="text-sm">Vá até <strong>CONFIGURAÇÕES</strong> > <strong>HOTSPOT WI-FI</strong> e inicie um roteador</p>
                            </li>
                            <li>
                                <p class="text-sm">Configure o nome do roteador à sua preferência, mas não esqueça de adicionar <strong>CHN-</strong> no início do nome</p>
                            </li>
                            <li>
                                <p class="text-sm">Selecione a segurança da rede como <strong>Nenhuma</strong> a fim de tornar um roteador wifi aberto</p>
                            </li>
                            <li>
                                <p class="text-sm">Ative o roteador no botão abaixo</p>
                            </li>
                        </ol>
                    </div>
                    <div class="router-status">
                        <label class="switch">
                            <input type="checkbox" v-model="routerActive">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="ip-container">
                        <label for="ip-input">Ip do roteador</label>
                        <input type="text" name="ip" id="ip-input" placeholder="Ex: 192.168.0.0" v-model="deviceIp">
                    </div>
                    <p class="response error"></p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import $ from 'jquery';

export default defineComponent({
    components: {
        IonContent,
        IonPage
    },
    data() {
        return {
            
        }
    },
    watch: {
    },
    methods: {
    }
})
</script>
<style scoped>
ion-content {
    background-image: linear-gradient(to bottom right, var(--black), var(--black-2));
  }
</style>