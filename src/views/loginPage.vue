<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="page-content">
                <returnComponent title="Entrar" return="/home" />
                <button class="google-btn" v-on:click="login">
                    <img src="../assets/img/google-logo.png">
                    Login com Google
                </button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import returnComponent from "../components/returnComponent.vue";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        returnComponent
    },
    data() {
        return {
            
        }
    },
    methods: {
        login: async function () {
            try {
                const response = await GoogleAuth.signIn();

                let dataUser = {
                    name: response.displayName,
                    email: response.email,
                    id: response.id,
                    token: response.token,
                    imageUrl: response.imageUrl
                }

                let self = this;
                
                this.api.post("app/google-login", dataUser).then((results) => {
                    
                    Object.assign(self.$usuario, results.data.returnObj.user);
                    self.setJwtInLocalStorage(results.data.returnObj.token);
                    
                    self.api.defaults.headers.common['Authorization'] = `Bearer ${results.data.returnObj.token}`;

                    self.$router.back();
                })
            } catch (error) {
                console.error('GoogleAuth Error:', error);
            }
        }
    },
    mounted: function () {
        
    }
})
</script>
<style scoped>
.google-btn {
    white-space: nowrap;
    font-size: 1rem;
    font-family: Open sans;
    font-weight: 600;
    color: var(--blue-low);
    display: flex;
    place-items: center; 
    gap: 1.2rem;
    padding: 1rem;   
    border-radius: 1rem;
    border: none;
    background: var(--gray-high);
    cursor: pointer;

    &:hover {
        background: var(--gray-medium);
    }

    & span {
        color: var(--blue-low);
        font-size: 1.1rem;
        white-space: nowrap;
    }

    & img {
        width: 40px;
        height: 40px;
    }
}

</style>