<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Add New Contact</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="d-flex flex-column justify-content-space-between h-100">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-label position="floating">Phone Number</ion-label>
                        <ion-input type="text" placeholder="Enter a phone number" @ionInput="onInput($event)" :maxlength="9"
                            v-model="addContactRequest.phoneNumber" ref="ionInputPhoneElement"
                            :disabled="isLoading"></ion-input>
                        <ion-text v-if="errors.length > 0" color="danger">
                            {{ errors[0] }}
                        </ion-text>
                    </ion-col>
                    <ion-col>
                        <ion-label position="floating">Name (optional)</ion-label>
                        <ion-input type="text" placeholder="Enter a name" :maxlength="30" v-model="addContactRequest.name"
                            :disabled="isLoading"></ion-input>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-row class="ion-justify-content-center" style="align-self: self-end;">
                <ion-card>
                    <ion-card-content style="display:flex; flex-direction: column; align-items: center; width:100%;">
                        <ion-checkbox :disabled="!isInputValid || isLoading" v-model="addContactRequest.saveContact">Save
                            contact in
                            my
                            contacts
                            list</ion-checkbox>
                        <ion-button :disabled="!isInputValid || isLoading" @click="addContact">
                            <ion-label class="ion-label-w-spinner">Add Contact <ion-spinner
                                    v-if="isLoading"></ion-spinner></ion-label>
                        </ion-button>
                    </ion-card-content>
                </ion-card>

            </ion-row>
        </div>
    </ion-content>
</template>
<style scoped>
.ion-label-w-spinner {
    display: flex;
    align-items: center;
    gap: 5px;
}

.d-flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.justify-content-space-between {
    justify-content: space-between;
}

.align-items-center {
    align-items: center;
}

.h-100 {
    height: 100%;
}
</style>
<script setup>
import { ref, onMounted, inject } from 'vue';
import {
    IonHeader, IonToolbar, IonContent, IonLabel, IonTitle,
    IonRow, IonCol, IonInput, IonButtons, IonButton, IonSpinner,
    IonText, IonGrid, IonCheckbox, modalController, toastController
} from '@ionic/vue';
import { Storage } from "@ionic/storage";

const axios = inject('axios');

const ownPhoneNumber = ref('');
const isLoading = ref(false);
const ionInputPhoneElement = ref();
const addContactRequest = ref({
    phoneNumber: '',
    name: '',
    saveContact: false
});
const isInputValid = ref(false);
const errors = ref([]);

const cancel = () => modalController.dismiss(null, 'cancel');

const onInput = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9]/g, '');
    addContactRequest.value.phoneNumber = filteredValue;
    const inputCmp = ionInputPhoneElement.value;
    if (inputCmp !== undefined) {
        inputCmp.$el.value = filteredValue;
    }

    let isValid = true;
    errors.value = [];

    if (addContactRequest.value.phoneNumber.length !== 9) {
        isValid = false;
        errors.value.push('Phone number must be 9 digits long');
    }

    if (addContactRequest.value.phoneNumber.length === 9 && !value.match(/^9/)) {
        isValid = false;
        errors.value.push('Phone number must be a valid Portuguese mobile phone number');
    }

    if (addContactRequest.value.phoneNumber.length === 9 && value === ownPhoneNumber.value) {
        isValid = false
        errors.value.push('You cannot add yourself as a contact');
    }

    isInputValid.value = isValid;
}

const addContact = async () => {
    isLoading.value = true;

    const toast = await toastController.create({
        message: 'Something went wrong. Please try again.',
        duration: 1500,
        position: "bottom",
        color: 'danger'
    });

    try {

        let exists = await axios.get(`vcards/${addContactRequest.value.phoneNumber}/exists`);
        if (!exists.data) {
            errors.value = ['Phone number is not associated with a vCard'];
            await toast.present();
            isLoading.value = false;
            return;
        }
    }
    catch (error) {
        await toast.present();
        isLoading.value = false;
        return;
    }

    if (addContactRequest.value.name == undefined || addContactRequest.value.name == '') {
        addContactRequest.value.name = addContactRequest.value.phoneNumber;
    }

    modalController.dismiss(addContactRequest.value, 'add');
    addContactRequest.value = {
        phoneNumber: '',
        name: '',
        saveContact: false
    };
    isLoading.value = false;
}

onMounted(async () => {
    const store = new Storage();
    await store.create();
    ownPhoneNumber.value = await store.get("phone_number");
});
</script>
