<template>
    <div class="user">
        <img :src="user.user_image" class="avatar">
        <p class="text-sm-bold">{{ user.user_name }}</p>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["user"],
    data() {
        return {

        }
    },
    mounted: function () {
        //console.log(this.user);
    }
})
</script>
<style scoped>
.user {
    display: flex;
    margin: .5rem 0;
}

    .user img {
        margin-right: 1rem;
    }
</style>