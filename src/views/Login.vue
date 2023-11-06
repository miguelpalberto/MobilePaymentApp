<template>
  <ion-page >
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="container">
        <ion-list class="list-container">
          <ion-item>
            <ion-label position="floating">Phone</ion-label>
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
        <div v-show="errors.length > 0">
          <p v-for="error in errors" class="error">{{ error }}</p>
        </div>
        <ion-button expand="block" @click="login">Create</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

  
  <script setup>
  import { ref, inject, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { Storage } from '@ionic/storage';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  
  const axios = inject('axios');
  const router = useRouter();

  const store = new Storage();
  store.create();

  onBeforeMount(() => {
    store.get('token').then((name) => {
      if (name){
        router.push('/dashboard');
      }
    });
  });

  const telemovel = ref('');
  const password = ref('');
  const pin = ref('');

  const errors = ref([]);

  const login = () => {
      // return router.push('/dashboard');
      //valida se o campo telemovel está vazio e se tem 9 digitos e começa por 9
      errors.value = [];
      let valid = true;
      if (telemovel.value == '' || telemovel.value.length != 9 || telemovel.value.charAt(0) != 9) {
          errors.value.push('The phone field is empty or does not have 9 digits or does not start with 9');
          valid = false;
      }
      //valida se o campo password está vazio
      if (password.value == '') {
        errors.value.push('The password field is empty');
        valid = false;
      }

      //valida se o campo pin está vazio e se tem 4 digitos
      if (pin.value == '' || pin.value.length != 3) {
        errors.value.push('The pin field is empty or does not have 3 digits');
        valid = false;
      }


      if (valid){
        axios.post('/auth/login', {
          username: telemovel.value,
          password: password.value,
          confirmation_code: pin.value
        }).then((response) => {
          console.log(response.data);
          if (response.data.access_token){
            store.set('token', response.data.access_token);
            router.push('/dashboard');
          }
        }, (error) => {
          console.log(error);
          if (error.response.status == 401 || error.response.status == 400){
            errors.value.push('Invalid credentials');
          }
        });
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
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  
  .list-container {
    width: 100%;
    max-width: 400px; /* Adjust max-width as needed */
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>