<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Notifications</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="isLoading" class="ion-padding">
            <ion-spinner></ion-spinner>
            <!-- <ion-loading trigger="open-loading" message="Loading..." spinner="circles"></ion-loading> -->
        </ion-content>
        <ion-content v-else class="ion-padding">
            <ion-list v-if="notifications.length > 0">
                <ion-item>
                    <ion-button @click="setAllNotificationsRead()" :disabled="disableDismissAll" slot="end">Dismiss all</ion-button>
                </ion-item>

                <ion-item v-for="notification in notifications" :key="notification.id">
                <ion-grid @click="setNotificationRead(notification)" >
                    <ion-row>
                        <ion-col col="2" size="10">
                            <ion-text>
                                <h4>{{ notification.datetime }}</h4>
                                <p>{{ notification.payment_reference }} sent {{ notification.value }}</p>
                            </ion-text>
                        </ion-col>
                        <ion-col col="2" size="2">
                            <ion-checkbox :disabled="notification.notification_read" :checked="notification.notification_read" alignment="center"></ion-checkbox>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                </ion-item>
            </ion-list>
            <div v-else>
                <p>No notifications</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  IonItem,
  IonTitle,
  IonGrid,
  IonCol,
  IonList,
  IonRow,
  IonSpinner,
  IonBackButton,
  IonButtons,
  IonButton,
  IonText, 
  IonCheckbox
} from "@ionic/vue";

import { inject, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const axios = inject("axios");
const isLoading = ref(true);
const notifications = ref([]);
const disableDismissAll = ref(true);

const loadNotifications = () => {
    axios.get(`vcards/${props.phone}/notifications`)
    .then((response) => {
      notifications.value = response.data.data;
      disableDismissAll.value = response.data.data
        .filter(notification => notification.notification_read == false).length > 0 ? false : true;
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
};

const setNotificationRead = (notification) => {
    axios.post(`vcards/notifications/${ notification.id }`)
    .then(() => {
    // loadNotifications();
      router.push(`/transactions/${props.phone}`)
    })
    .catch((error) => {
      console.log(error)
    });
};

const setAllNotificationsRead = () => {
    axios.post(`vcards/${ props.phone }/notifications`)
    .then(() => {
        // loadNotifications();
        router.push(`/transactions/${props.phone}`)
    })
    .catch((error) => {
        console.log(error)
    });
};

onMounted(() => {
  loadNotifications();
});

</script>