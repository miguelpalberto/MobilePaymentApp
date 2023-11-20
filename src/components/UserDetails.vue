<template>
    <ion-page >
      <ion-header>
        <ion-toolbar>
          <ion-title>User details</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" class="ion-padding">

        <ion-item v-if="isLoading">
          <ion-spinner></ion-spinner>
        </ion-item>
        <ion-avatar v-else>
          <img v-if="photoUrl == null" alt="User photo" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          <img v-else alt="User photo" :src="photoUrl" />
        </ion-avatar>
        
        <div class="container" style="margin-top: 5%;">
          <ion-list class="list-container">
            <ion-item>
              <ion-input label="Phone number" v-model="phoneNumber" label-placement="stacked" :readonly="true"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Name" v-model="vcard.name" label-placement="stacked" :readonly="true"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Email" v-model="vcard.email" label-placement="stacked" :readonly="true"></ion-input>
            </ion-item>
            <!-- <ion-item>
              <ion-input label="Password" v-model="vcard.email" label-placement="stacked" :readonly="true"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="PIN" v-model="vcard.email" label-placement="stacked" :readonly="true"></ion-input>
            </ion-item> -->
          </ion-list>
          <br>
          <br>
          <ion-button expand="block">Edit</ion-button>
        </div>
      </ion-content>
    </ion-page>
</template>
  
<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { create } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton,
   IonAvatar, IonSpinner} from '@ionic/vue';

const axios = inject('axios');
const serverBaseUrl = inject('serverBaseUrl');
const router = useRouter();
const props = defineProps({
    phone: {
        type: String,
        required: true
    }
});

const phoneNumber = ref(props.phone);
const isLoading = ref(true);
const vcard = ref({});
const photoUrl = ref('');

onMounted(() => {
    axios.get(`vcard/${props.phone}`).then((response) => {
        vcard.value = response.data.data;
        console.log(vcard.value)
        isLoading.value = false;
        if(vcard.value.photo_url == undefined){
          photoUrl.value = null
        } else {
          photoUrl.value = `${serverBaseUrl}/storage/fotos/${vcard.value.photo_url}`;
        }
    })
    .catch((error) => {
      console.log(error)
    })
});
</script>