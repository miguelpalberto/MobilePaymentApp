<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Reset</ion-button>
      </ion-buttons>
      <ion-title>Filters</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <br>
    <br>
    <div v-show="!showEndDate">
      <label class="label">Start Date:</label>
      <input class="dateInput" v-model="localeStartDate" @click="openStartDate" :disabled="showStartDate" />
      <ion-datetime v-if="showStartDate" v-model="selectedStartDate" locale="pt-pt" ></ion-datetime>

      <ion-button v-if="showStartDate" @click="saveStartDate">OK</ion-button>
    </div>
    <br>
    <div v-show="!showStartDate">
      <label class="label">End Date:</label>
      <input class="dateInput" v-model="localeEndDate" @click="openEndDate" :disabled="showEndDate" />
      <ion-datetime v-if="showEndDate" v-model="selectedEndDate" locale="pt-pt"></ion-datetime>
      <ion-button v-if="showEndDate" @click="saveEndDate">OK</ion-button>
    </div>
    <ion-list>
    <br>
    <ion-item>
      <ion-select aria-label="Type" interface="popover" placeholder="Select transaction type"  v-model="selectedType">
        <ion-select-option value="All">All</ion-select-option>
        <ion-select-option value="Debit">Debit</ion-select-option>
        <ion-select-option value="Credit">Credit</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  </ion-content>


</template>

<script setup>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonInput, modalController, IonDatetime, IonSelect, IonSelectOption } from '@ionic/vue';
import { onMounted, ref, computed } from 'vue';

const props = defineProps(['filterByDate', 'filterByType']);


const name = ref();
const showStartDate = ref(false);
const showEndDate = ref(false);
const selectedStartDate = ref(props.filterByDate?.startDate || new Date(1990,1,1).toISOString()) ;
const selectedEndDate = ref(props.filterByDate?.endDate || new Date().toISOString());
const selectedType = ref(props.filterByType || 'All');



//Formatar string da data:
const localeStartDate = computed(()=>{
   return new Date(selectedStartDate.value)
    .toLocaleString('pt', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
})

const handleChangeSelection = (event) => {
  console.log(event.detail.value);
};


const localeEndDate = computed(()=>{
   return new Date(selectedEndDate.value)
    .toLocaleString('pt', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
})



const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss({ filterByDate:{startDate: selectedStartDate.value, endDate: selectedEndDate.value}, filterByType:{selectedType: selectedType.value }}, 'confirm');

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
.ion-title {
  padding-bottom: 10px;
}

</style>

