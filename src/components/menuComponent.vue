<template>
    <img :src="$usuario.url_foto_perfil || defaultUserImage" :alt="$usuario.name" class="avatar menu-button" v-on:click="showMenu = !showMenu">
    <div class="menu-wrapper" :style="'visibility: ' + (showMenu ? 'visible' : 'hidden')" v-on:click="showMenu = !showMenu"></div>
    <div class="menu" :class="showMenu ? 'show' : 'hidden'">
        <div class="menu-header">
            <img src="../assets/img/icon.png" alt="Compra rápida" class="avatar">
            <span>Compra rápida</span>
        </div>
        <ul>
            <li v-on:click="showMenu = !showMenu; $router.go(); logout()" v-if="$usuario.url_foto_perfil">Sair</li>
            <li v-else v-on:click="showMenu = !showMenu; $router.push('/login')">Entrar</li>
        </ul>
        <div class="signature">
            v {{ $version }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            defaultUserImage: this.api.defaults.baseURL + "public/default-user-image.png",
            showMenu: false
        }
    },
    methods: {
        
    },
    mounted: function () {
    }
}
</script>
<style scoped>
.menu-button {
    position: absolute;
    right: 1rem;
    cursor: pointer;
}

.menu-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.3);
    transition: visibility 0.4s ease-in-out;
    visibility: hidden;
}

.menu {
    width: 60vw;
    height: calc(100vh - 72px);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    background: var(--ion-background-color);
    padding: var(--space-10) var(--space-6);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-10);
    transition: transform 0.4s ease-in-out;
    transform: translateX(100%);

    &.show {
        transform: translateX(0);
    }

    &.hide {
        transform: translateX(100%);
    }

    & .menu-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    & ul {
        margin: 0;
        padding: 0;
        list-style: none;
        font-weight: 600;
    }
}

.signature {
    position: absolute;
    bottom: var(--space-10);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
}
</style>