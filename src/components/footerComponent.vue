<template>
    <div class="footer-container">
        <div 
            class="menu-item" 
            v-on:click="goToHome" 
            :class="{ active: activeMenu === 'home' }"
        >
            <ion-icon name="home"></ion-icon>
            <p class="text-sm-2">Início</p>
        </div>
        <div 
            class="menu-item" 
            v-on:click="goToCart" 
            :class="{ active: activeMenu === 'cart' }"
        >
            <IonIcon  name="cart"></IonIcon>
            <p class="text-sm-2">Carrinho</p>
        </div>
        <div 
            class="menu-item" 
            v-on:click="goToOrders" 
            :class="{ active: activeMenu === 'orders' }"
        >
            <ion-icon name="bag"></ion-icon>
            <p class="text-sm-2">Pedidos</p>
        </div>
    </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonIcon },
    data() {
        return {
            activeMenu: '',  // Vai armazenar qual menu está ativo
        };
    },
    watch: {
        '$route.path'(newPath) {
            this.setActiveMenuByRoute(newPath);
        }
    },
    methods: {
        // Função para ir para a página Home
        goToHome() {
            this.activateMenu('home');
            this.$router.push("/home");
        },
        // Função para ir para o carrinho
        goToCart() {
            this.activateMenu('cart');
            this.$router.push("/cart");
        },
        // Função para ir para os pedidos
        goToOrders() {
            this.activateMenu('orders');
            this.$router.push("/orders");
        },
        // Método para ativar o menu e reiniciar a animação
        activateMenu(menu) {
            if (this.activeMenu === menu) {
                // Se o menu já estiver ativo, "reinicia" a animação
                this.activeMenu = '';  // Remove a classe 'active'
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.activeMenu = menu;  // Reativa o menu
                    }, 50); // 50ms de delay para permitir a reinicialização da animação
                });
            } else {
                // Se o menu não estiver ativo, apenas ativa ele
                this.activeMenu = menu;
            }
        },
        setActiveMenuByRoute(route) {
            if (route.startsWith("/home")) this.activeMenu = "home";
            else if (route.startsWith("/cart")) this.activeMenu = "cart";
            else if (route.startsWith("/orders")) this.activeMenu = "orders";
            else this.activeMenu = "";
        }
    },
    mounted: function () {
        this.setActiveMenuByRoute(this.$route.path);
    }
})

</script>

<style scoped>
.footer-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-image: linear-gradient(to right, var(--orange), var(--orange-2));
    padding: 1rem 0;
    z-index: 100;
    overflow: hidden;
}

.menu-item {
    display: grid;
    place-items: center;
    cursor: pointer;
    position: relative;
    width: 60px;
    min-width: 60px;
    max-width: 60px;
}

.menu-item p, .menu-item ion-icon {
    color: var(--white);
}

.menu-item ion-icon {
    font-size: 1.5rem;
}

/* Efeito de clique - ripple */
.menu-item.active::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    animation: ripple-animation 0.4s ease-out forwards;
    top: 0;
    bottom: 0;
    left: -36%;
    height: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
    transform: scale(0.7);
}

/* Efeito de expansão */
@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* Cor ativa para o item selecionado */
.menu-item.active p, .menu-item.active ion-icon {
    color: var(--green-high);
}
</style>
