<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div v-show="!showEndDate">
      <label>Start Date:</label>
      <input class="dateInput" v-model="selectedStartDate" @click="openStartDate" :disabled="showStartDate" />
      <ion-datetime v-if="showStartDate" v-model="selectedStartDate" ></ion-datetime>

      <ion-button v-if="showStartDate" @click="saveStartDate">OK</ion-button>
    </div>
    <div v-show="!showStartDate">
      <label>End Date:</label>
      <input class="dateInput" v-model="selectedEndDate" @click="openEndDate" :disabled="showEndDate" />
      <ion-datetime v-if="showEndDate" v-model="selectedEndDate"></ion-datetime>
      <ion-button v-if="showEndDate" @click="saveEndDate">OK</ion-button>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonInput, modalController, IonDatetime } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const name = ref();
const showStartDate = ref(false);
const showEndDate = ref(false);
const selectedStartDate = ref('');
const selectedEndDate = ref('');

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss({ startDate: selectedStartDate.value, endDate: selectedEndDate.value }, 'confirm');

const openStartDate = () => {
  showEndDate.value = false;
  showStartDate.value = true;
};
const saveStartDate = () => showStartDate.value = false;

const openEndDate = () => {
  showStartDate.value = false;
  showEndDate.value = true;
};
const saveEndDate = () => showEndDate.value = false;
</script>

<style scoped>
.dateInput {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.custom-button-sorts {
  height: 30px;
}
</style>
