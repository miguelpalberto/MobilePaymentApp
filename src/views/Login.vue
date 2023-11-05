<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" class="center">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Telemovel</ion-label>
            <ion-input v-model="telemovel" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">PIN</ion-label>
            <ion-input v-model="pin" type="password"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="block" @click="login">Create</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { Storage } from '@ionic/storage';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  
  const axios = inject('axios');
  const router = useRouter();



    const telemovel = ref('');
    const password = ref('');
    const pin = ref('');

  
    const login = () => {
        // return router.push('/dashboard');
    // Aqui você irá adicionar a lógica para realizar o login
    // Isso provavelmente envolverá fazer uma requisição HTTP a um endpoint
        //valida se o campo telemovel está vazio e se tem 9 digitos e começa por 9
        if (telemovel.value == '' || telemovel.value.length != 9 || telemovel.value.charAt(0) != 9) {
            alert('O campo telemovel está vazio ou não tem 9 digitos ou não começa por 9');
            return;
        }
        //valida se o campo password está vazio
        if (password.value == '') {
            alert('O campo password está vazio');
            return;
        }

        //valida se o campo pin está vazio e se tem 4 digitos
        if (pin.value == '' || pin.value.length != 4) {
            alert('O campo pin está vazio ou não tem 4 digitos');
            return;
        }

        //valid 
        
    };

    // const abc = async () => {
    //     const store = new Storage();
    //     await store.create();
    //     const name = await store.get('name');
    //     // await store.set('name', 'Max');
    //     console.log(name)
    // }

    // abc()
 


  </script>
  
  <style scoped>
  .center {
    width: 50%;
    padding: 20px;
  }
  

  </style>