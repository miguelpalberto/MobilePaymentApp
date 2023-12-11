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


      <div class="container" style="display:flex; height: 93%; 
    flex-flow: column wrap;
    justify-content: space-between;">
        <div>

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
        
        <ion-button expand="block" :color="isEditing ? 'secondary' : 'primary'" @click="toggleEditMode">
          {{ isEditing ? 'Save' : 'Edit' }}
        </ion-button>
      </div>
        
        <!-- <ion-button expand="block" @click="toggleEditMode">{{ isEditing ? 'Save' : 'Change Password and PIN' }}</ion-button> -->
        
        <div>
          <ion-button expand="block" color="warning" @click="dismissVCard" :disabled="isEditing">
            <ion-icon :icon="personRemoveOutline"></ion-icon>
            &nbsp;Dismiss
          </ion-button>
          <ion-button expand="block" color="danger" @click="deleteVCard" :disabled="isEditing">
            <ion-icon :icon="trash"></ion-icon>
            &nbsp;Delete
          </ion-button>
        </div>
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

      <ion-modal v-if="showDeleteVCardConfirmation" :is-open="showDeleteVCardConfirmation">
        <ion-content class="ion-text-center">
          <ion-card>
            <ion-card-content>
              <ion-card-title>Delete VCard</ion-card-title>
              <p>Are you sure you want to delete this VCard?</p>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input v-model="confirmationPassword" type="password"
                  @ion-input="validateDeleteRequestData"></ion-input>
                <ion-text v-if="deleteFormErrors && deleteFormErrors.password" color="danger">
                  {{ deleteFormErrors.password[0] }}
                </ion-text>
              </ion-item>
              <ion-item>
                <ion-label position="floating">PIN</ion-label>
                <ion-input v-model="confirmationPin" type="password" @ion-input="validateDeleteRequestData"></ion-input>
                <ion-text v-if="deleteFormErrors && deleteFormErrors.confirmation_code" color="danger">
                  {{ deleteFormErrors.confirmation_code[0] }}
                </ion-text>
              </ion-item>
              <ion-item>
                <ion-text style="margin-top:30px" v-if="deleteFormErrors && deleteFormErrors.balance" color="danger">
                  {{ deleteFormErrors.balance[0] }}
                </ion-text>
              </ion-item>
            </ion-card-content>
          </ion-card>
          <ion-button expand="full" color="danger" :disabled="isLoading || !isDeleteFormValid"
            @click="deleteVCardConfirmed">Yes</ion-button>
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
  IonCard, IonCardContent, IonCardTitle, IonHeader, IonToolbar,
  IonTitle, IonText, IonLabel, IonIcon
} from '@ionic/vue';
import { Storage } from '@ionic/storage';
import { useRouter } from 'vue-router'
import { trash, personRemoveOutline } from 'ionicons/icons';

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
const showDeleteVCardConfirmation = ref(false);

const confirmationPin = ref('');
const confirmationPassword = ref('');
const deleteFormErrors = ref(null);
const isDeleteFormValid = ref(false);


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

const deleteVCard = async () => {
  showDeleteVCardConfirmation.value = true;
  validateDeleteRequestData();
};

const deleteVCardConfirmed = async () => {
  try {
    await axios.delete(`vcards/${props.phone}/delete`, {
      data: {
        password: confirmationPassword.value,
        confirmation_code: confirmationPin.value
      }
    }).then(async (response) => {
      await store.remove('token');
      await store.remove('phone_number');
      await store.remove('pin');
      closeModals();
      router.push('/login');
    })
  }
  catch (error) {
    if (error.response.status == 422) {
      deleteFormErrors.value = error.response.data.errors;
    }

    console.log(error);
  }
};

const validateDeleteRequestData = () => {
  deleteFormErrors.value = {
    confirmation_code: [],
    password: [],
    balance: []
  };

  let isValid = true;
  if (confirmationPassword.value == '') {
    deleteFormErrors.value.password.push('The password field is empty');
    isValid = false;
  }

  if (confirmationPin.value == '') {
    deleteFormErrors.value.confirmation_code.push('The confirmation code field is empty');
    isValid = false;
  }

  isDeleteFormValid.value = isValid;
}

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
  showDeleteVCardConfirmation.value = false;
  confirmationPassword.value = '';
  confirmationPin.value = '';
  deleteFormErrors.value = null;
};
</script>