<template>
    <div class="user">
        <img :src="user.user_image" class="avatar">
        <div class="user-texts">
            <p class="text-sm-bold">{{ user.user_name }}</p>
            <p class="text-sm-2 last-message" :class="user.last_message_state != 'viewed' && user.last_message_state != '' ? 'unseen' : ''">{{ user.last_message }}</p>
        </div>
        <div class="messages-status">
            <span class="text-sm-2-bold">{{ returnRelativeTime(user.last_message_view_date) }}</span>
            <div class="unseen-messages-count" v-if="user.unseen_messages != 0">{{ user.unseen_messages }}</div>
            <div class="last-message-state" v-if="user.unseen_messages == 0 && user.last_message_state == ''">
                <ion-icon :icon="checkmark" v-if="user.last_message_sent_by_me_state == 'send'"></ion-icon>
                <ion-icon :icon="checkmarkDone" v-if="user.last_message_sent_by_me_state != 'send'" :class="user.last_message_sent_by_me_state == 'viewed' ? 'blue-check' : ''"></ion-icon>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import moment from 'moment';
import 'moment-timezone';
import { IonIcon } from "@ionic/vue";
import { checkmark, checkmarkDone } from "ionicons/icons";

export default defineComponent({
    props: ["user"],
    mounted: function () {
        console.log(this.user)
    },
    methods: {
        returnRelativeTime: function (time) {
            return moment.tz(time, "Etc/GMT+3").fromNow();
        }
    },
    components: {
        IonIcon
    },
    setup() {
        return {
            checkmark,
            checkmarkDone
        }
    }
})
</script>
<style scoped>
p {
    margin: 0;
}
.user {
    display: flex;
    align-items: center;
    margin: .5rem 0;
}

    .user img {
        margin-right: 1rem;
    }

.unseen {
    font-weight: 600;
}

.last-message {
    white-space: nowrap;
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-texts {
    height: fit-content;
    width: 61%;
}

.unseen-messages-count {
    font-size: 10px;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: var(--green);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
}

.messages-status {
    display: flex;
    flex-direction: column;
    align-items: center;
}

    .messages-status span:first-child {
        margin-bottom: 3px;
    }

.blue-check {
    color: var(--blue);
}
</style>