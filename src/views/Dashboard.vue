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
  
  <script setup>
  import { ref, inject } from 'vue';
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSpinner, onIonViewWillEnter  } from '@ionic/vue';
  import { Storage } from '@ionic/storage';
  import { useRouter } from 'vue-router';

  import Balance from '../components/Balance.vue';

  const phone = ref('');
  const loading = ref(true);


  const axios = inject('axios');

  const router = useRouter();

  onIonViewWillEnter(async () => {
    console.log('mounted')
    const store = new Storage();
    await store.create();
    const token = await store.get('token')

    console.log(token)
    if (!token){
      router.push('/login');
    }else{
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      const phoneNumber = await store.get('phone_number')
      console.log('phone number', phoneNumber);
      if (phoneNumber){
        phone.value = phoneNumber;
      }
      loading.value = false;
    }
    
  });



 
 </script>
  
  <style scoped>

 
  </style>
  