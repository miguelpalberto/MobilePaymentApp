<template>
  <ion-page>
    <io-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </io-header>
    <ion-content>
      <div>
        <div v-if="loading">
            <ion-spinner></ion-spinner>
        </div>
        <div v-else>
            <Balance :phone="phone"></Balance>
          </div>
      </div>
    </ion-content>


    
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, inject, onBeforeMount } from 'vue';
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSpinner  } from '@ionic/vue';
  import { Storage } from '@ionic/storage';
  import { useRouter } from 'vue-router';

  import Balance from '../components/Balance.vue';

  const phone = ref('');
  const loading = ref(true);

  const store = new Storage();
  store.create();

  const axios = inject('axios');

  const router = useRouter();

  onBeforeMount(() => {
    store.get('token').then((token) => {
    if (!token){
      router.push('/login');
    }else{
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      store.get('phone_number').then((phoneNumber) => {
        if (phoneNumber){
          phone.value = phoneNumber;
          loading.value = false;
        }
      });
    }
  });
  });



 
 </script>
  
  <style scoped>

 
  </style>
  