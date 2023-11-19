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
        

        <div class="container" style="margin-top: 10%;">
        <ion-list class="list-container" v-if="!isEditing">
          <ion-item v-if="!isEditing">
            <ion-input label="Phone number" v-model="phoneNumber" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Name" v-model="vcard.name" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Email" v-model="vcard.email" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item>
          
          <!-- <ion-item>
            <ion-input label="Password" v-model="maskedPassword" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="PIN" v-model="maskedPIN" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item> -->

        </ion-list>
        <ion-list class="list-container" v-else>
          <ion-item>
            <ion-input label="Phone number" v-model="phoneNumber" label-placement="stacked" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Name" v-model="vcard.name" label-placement="stacked" :readonly="false"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Email" v-model="vcard.email" label-placement="stacked" :readonly="false"></ion-input>
          </ion-item>
          <!-- <ion-item>
            <ion-input label="Password" v-model="editablePassword" label-placement="stacked" type="password" :readonly="false"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="PIN" v-model="editablePIN" label-placement="stacked" type="password" :readonly="false"></ion-input>
          </ion-item> -->
        </ion-list>
        <br>
        <br>
        <ion-button expand="block" @click="toggleEditMode">{{ isEditing ? 'Save' : 'Edit' }}</ion-button>
        <!-- <ion-button expand="block" @click="toggleEditMode">{{ isEditing ? 'Save' : 'Change Password and PIN' }}</ion-button> -->
        
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
          photoUrl.value = `http://localhost/taes_backend/public/storage/fotos/${vcard.value.photo_url}`;
        }
    })
    .catch((error) => {
      console.log(error)
    })
});

const maskedPassword = "********"; //computed(() => '*'.repeat(8));
const maskedPIN = "***"; //computed(() => '*'.repeat(3));

const editablePassword = ref('');
const editablePIN = ref('');
const isEditing = ref(false);

const toggleEditMode = async () => {
  if (isEditing.value) {
    // Save changes
    try {
      await axios.put(`vcard/${props.phone}`, {
        name: vcard.value.name,
        email: vcard.value.email,
        //password: editablePassword.value,
        //pin: editablePIN.value,
      });

      // Optionally update the local vcard with the edited values
      vcard.value.name = vcard.value.name;
      vcard.value.email = vcard.value.email;
      //vcard.value.password = editablePassword.value;
      //vcard.value.pin = editablePIN.value;

      // Perform any additional actions after successful save
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  } else {
    // Enter edit mode
    //editablePassword.value = vcard.value.password;
    //editablePIN.value = vcard.value.pin;
  }

  isEditing.value = !isEditing.value;
};
</script>