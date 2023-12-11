<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item v-if="isLoading">
        <ion-spinner></ion-spinner>
      </ion-item>

      <ion-item @click="saveAutoSavings" style="align-items: center;">
        <ion-label>Auto-Savings</ion-label>
        <ion-toggle :checked="autoSavings"></ion-toggle>
      </ion-item>

      <div style="height: 10px;"></div>

      <ion-item @click="toggleNotifications" style="align-items: center;">
        <ion-label>Notifications</ion-label>
        <ion-toggle :checked="isNotificationsEnabled"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonAvatar, IonSpinner, IonButtons, IonBackButton, onIonViewWillEnter, IonToggle } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router'
import { Storage } from '@ionic/storage';
//import axios from 'axios';

const axios = inject('axios');

const serverBaseUrl = inject('serverBaseUrl');
const router = useRouter();
const route = useRoute();
const store = new Storage();
const props = defineProps({
  phone: {
    type: String,
    required: true
  }
});

const autoSavings = ref(route.params.autosavings);
//const notifications = ref(route.params.togglenotifications);
const setToggleNotificationsUrl = `/vcards/${route.params.phoneNumber}/toggleNotifications`;
const getCurrentToggleNotiUrl = `/vcards/${route.params.phoneNumber}/getNotificationsToggle`;
const isNotificationsEnabled = ref(true); // ao inicio


onIonViewWillEnter(async () => {
    await store.create();
    const autosavings = await store.get('autosavings');
    if (autosavings){
      autoSavings.value = autosavings;
    }
  //   const togglenotifications = await store.get('togglenotifications');
  // if (togglenotifications) {
  //   notifications.value = togglenotifications;
  //   isNotificationsEnabled.value = togglenotifications;
  // }
  });

const saveAutoSavings = async () => {
   autoSavings.value = !autoSavings.value;
   //console.log(autoSavings.value);
   await store.set('autosavings', autoSavings.value);
   
}

const toggleNotifications = async () => {
    try {
        const response = await axios.patch(setToggleNotificationsUrl);
        isNotificationsEnabled.value = response.data.notifications;
    } catch (error) {
        console.error('Error toggling notifications:', error);
    }
};

const getCurrentToggleNotifications = async () => {
    try {
        const response = await axios.get(getCurrentToggleNotiUrl);
        isNotificationsEnabled.value = response.data.notifications;
        //console.log(isNotificationsEnabled.value)
    } catch (error) {
        console.error('Error fetching notifications status:', error);
        // Handle error as needed
    }
};



onMounted(async () => {
  getCurrentToggleNotifications()
});
</script>
