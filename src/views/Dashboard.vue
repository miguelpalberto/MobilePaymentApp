<template>
    <ion-page>
      dashboard
      <div>
        <ion-list>
          <ion-item v-for="vcard in vcards" :key="vcard.id">
            <ion-label>{{ vcard.name }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, inject, onBeforeMount } from 'vue';
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { Storage } from '@ionic/storage';
  import { useRouter } from 'vue-router';

  const vcards = ref([]);

  const store = new Storage();
  store.create();

  const axios = inject('axios');

  const router = useRouter();

  onBeforeMount(() => {
    store.get('token').then((token) => {
      if (!token){
        router.push('/login');
      }else{
        axios.defaults.headers.common.Authorization = 'Bearer ' + token

      }
    });
  });



 
 </script>
  
  <style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  </style>
  