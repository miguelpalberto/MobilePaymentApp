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
        <ion-toggle :checked="notifications"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonAvatar, IonSpinner, IonButtons, IonBackButton, onIonViewWillEnter } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router'
import { Storage } from '@ionic/storage';

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
const notifications = ref(getSavedState("notifications", true));

onIonViewWillEnter(async () => {
    await store.create();
    const autosavings = await store.get('autosavings');
    if (autosavings){
      autoSavings.value = autosavings;
    }
  });

const saveAutoSavings = async () => {
   autoSavings.value = !autoSavings.value;
   //console.log(autoSavings.value);
   await store.set('autosavings', autoSavings.value);
   
}

function toggleNotifications() {
  notifications.value = !notifications.value;
  saveState("notifications", notifications.value);
}

function getSavedState(key, defaultValue) {
  const savedState = localStorage.getItem(key);
  return savedState !== null ? JSON.parse(savedState) : defaultValue;
}

function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

onMounted(() => {
  // You can perform additional setup when the component is mounted.
});
</script>
