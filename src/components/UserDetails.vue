<template>
  <ion-page>
    <ion-header>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>User Details</ion-title>
        </ion-toolbar>
      </ion-header>
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
        <ion-button expand="block" :color="isEditing ? 'secondary' : 'primary'" @click="toggleEditMode"> {{ isEditing ?
          'Save' : 'Edit' }}</ion-button>
        <ion-button expand="block" color="danger" @click="dismissVCard" :disabled="isEditing"> Dismiss </ion-button>
        <!-- <ion-button expand="block" @click="toggleEditMode">{{ isEditing ? 'Save' : 'Change Password and PIN' }}</ion-button> -->

      </div>


      <!-- Modals -->
      <!-- Success Modal -->
      <ion-modal v-if="showSuccessModal" :is-open="showSuccessModal">
        <ion-content class="ion-text-center">
          <ion-card>
            <ion-card-content>
              <ion-card-title>Success</ion-card-title>
              <p>Your changes have been updated successfully!</p>
            </ion-card-content>
          </ion-card>
          <ion-button expand="full" color="success" @click="closeModals">Close</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Error Modal -->
      <ion-modal v-if="showErrorModal" :is-open="showErrorModal">
        <ion-content class="ion-text-center">
          <ion-card>
            <ion-card-content>
              <ion-card-title>Error</ion-card-title>
              <p>There was an error updating your changes. Please try again.</p>
            </ion-card-content>
          </ion-card>
          <ion-button expand="full" color="danger" @click="closeModals">Close</ion-button>
        </ion-content>
      </ion-modal>

      <ion-modal v-if="showDismissVCardConfirmation" :is-open="showDismissVCardConfirmation">
        <ion-content class="ion-text-center">
          <ion-card>
            <ion-card-content>
              <ion-card-title>Dismiss VCard</ion-card-title>
              <p>Are you sure you want to dismiss this VCard?</p>
            </ion-card-content>
          </ion-card>
          <ion-button expand="full" color="danger" @click="dismissVCardConfirmed">Yes</ion-button>
          <ion-button expand="full" color="success" @click="closeModals">No</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { ref, inject, onMounted } from 'vue';
import {
  IonPage, IonContent, IonList, IonItem, IonInput, IonButton,
  IonAvatar, IonSpinner, IonButtons, IonBackButton, IonModal,
  IonCard, IonCardContent, IonCardTitle, IonHeader, IonToolbar, IonTitle
} from '@ionic/vue';
import { Storage } from '@ionic/storage';
import { useRouter } from 'vue-router'

const axios = inject('axios');

const serverBaseUrl = inject('serverBaseUrl');
const router = useRouter();
const store = new Storage();
const props = defineProps({
  phone: {
    type: String,
    required: true
  }
});
//await store.set('token', response.data.access_token);

const originalName = ref('');
const originalEmail = ref('');
const originalEditing = ref(false);

const phoneNumber = ref(props.phone);
const isLoading = ref(true);
const vcard = ref({});
const photoUrl = ref('');

onMounted(() => {
  axios.get(`vcard/${props.phone}`).then(async (response) => {
    vcard.value = response.data.data;
    console.log(vcard.value)
    isLoading.value = false;
    if (vcard.value.photo_url == undefined) {
      photoUrl.value = null
    } else {
      photoUrl.value = `${serverBaseUrl}/storage/fotos/${vcard.value.photo_url}`;
    }
    // Store original values
    originalName.value = vcard.value.name;
    originalEmail.value = vcard.value.email;
    originalEditing.value = false;
    await store.create();

  })
    .catch((error) => {
      console.log(error);
    });
});

const maskedPassword = "********"; //computed(() => '*'.repeat(8));
const maskedPIN = "***"; //computed(() => '*'.repeat(3));

const editablePassword = ref('');
const editablePIN = ref('');
const isEditing = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const showDismissVCardConfirmation = ref(false);


const dismissVCard = async () => {
  showDismissVCardConfirmation.value = true;
};

const dismissVCardConfirmed = async () => {
  await store.remove('token');
  await store.remove('phone_number');
  await store.remove('pin');
  closeModals();
  router.push('/login');
};

const toggleEditMode = async () => {
  if (isEditing.value) {
    try {
      await axios.put(`vcard/${props.phone}`, {
        name: vcard.value.name,
        email: vcard.value.email,
        // password: editablePassword.value,
        // pin: editablePIN.value,
      });

      // Show success modal
      showSuccessModal.value = true;

      // Additional actions after successful save
      originalName.value = vcard.value.name;
      originalEmail.value = vcard.value.email;
      originalEditing.value = false;

    } catch (error) {
      console.error('Error saving changes:', error);

      // Show error modal
      showErrorModal.value = true;

      // Revert changes on error
      vcard.value.name = originalName.value;
      vcard.value.email = originalEmail.value;

    }
  } else {
    // Enter edit mode
    // editablePassword.value = vcard.value.password;
    // editablePIN.value = vcard.value.pin;
    originalEditing.value = isEditing.value;
  }

  isEditing.value = !isEditing.value;
};

const closeModals = () => {
  showSuccessModal.value = false;
  showErrorModal.value = false;
  showDismissVCardConfirmation.value = false;
};
</script>