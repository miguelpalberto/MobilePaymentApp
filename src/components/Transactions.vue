<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transactions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="isLoading">
        <ion-spinner></ion-spinner>
      </div>
      <div v-else>
        <div v-if="transactionFilteredAndSorted.length > 0">
          <div class="container">
            <ion-button class="custom-button-sorts date-button" :disabled="sortBy=='date'" size="" @click="sortByDate">
              <ion-icon :icon="calendarOutline"></ion-icon>
            </ion-button>

            <ion-button class="custom-button-sorts euro-button" :disabled="sortBy=='value'" @click="sortByValue">
              <ion-icon :icon="logoEuro"></ion-icon>
            </ion-button>

            <ion-button class="custom-button-sorts arrow-button" @click="toogleAscDesc">
              <ion-icon :icon="caretDownOutline" v-if="ascDesc == 'asc'"></ion-icon>
              <ion-icon :icon="caretUpOutline" v-if="ascDesc == 'desc'"></ion-icon>
            </ion-button>
          </div>
          <ion-list>
            <ion-item v-for="transaction in transactionFilteredAndSorted">
              <ion-label>
                <ion-grid>
                  <ion-row>
                    <ion-col size="12">
                      <p>Reference:</p>
                      <h1>{{ transaction.payment_reference }}</h1>
                    </ion-col>
                    <ion-col size="8" style="margin-top: 5px">
                      <p>{{ transaction.datetime }}</p>
                    </ion-col>
                    <ion-col size="4" class="ion-text-end">
                      <h1
                        style="padding: 0; margin: 0"
                        :style="{
                          color: transaction.value.includes('-')
                            ? 'red'
                            : 'green',
                        }"
                        color="success"
                      >
                        {{ transaction.value }}
                      </h1>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
        <div v-else>
          <p>No transactions</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  IonItem,
  IonSpinner,
  IonButton,
} from "@ionic/vue";
import { calendarOutline, logoEuro, caretDownOutline, caretUpOutline } from "ionicons/icons";

import { inject, ref, onMounted, computed } from "vue";

//import { Transaction } from '../components/Transaction.vue';

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
});

const axios = inject("axios");
const isLoading = ref(true);
const transactions = ref([]);

const sortBy = ref('value');

const sortByDate = () => sortBy.value = 'date';
const sortByValue = () => sortBy.value = 'value';

const ascDesc = ref('asc');

const toogleAscDesc = () => {
  if (ascDesc.value == 'asc'){
    ascDesc.value = 'desc';
  }else{
    ascDesc.value = 'asc';
  }
}


const transactionFilteredAndSorted = computed(()=>{
    if (sortBy.value == 'date'){
        //create a copy of the array
        let transactionsCopy = [...transactions.value];

        //sort the array
        transactionsCopy.sort((a,b)=>{
          if (ascDesc.value == 'asc'){
            return a.datetime > b.datetime ? 1 : -1;

          }else{
            return a.datetime < b.datetime ? 1 : -1;
          }
        });

        //return the sorted array
        return transactionsCopy;

    }else if (sortBy.value == 'value'){
        //create a copy of the array
        let transactionsCopy = [...transactions.value];

        //sort the array
        transactionsCopy.sort((a,b)=>{
            const valorSemEuro1 = parseFloat(a.value.replace('€', ''));
            const valorSemEuro2 = parseFloat(b.value.replace('€', ''));

            if (ascDesc.value == 'asc'){
              return valorSemEuro1 < valorSemEuro2 ? 1 : -1;
            }
            else{
              return valorSemEuro1 > valorSemEuro2 ? 1 : -1;
            } 
        });

        //return the sorted array
        return transactionsCopy;

      }

});


onMounted(() => {
  axios
    .get(`vcards/${props.phone}/transactions`)
    .then((response) => {
      transactions.value = response.data.data;
      console.log(transactions.value);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style>
.container{
  display: flex;
  justify-content:flex-end;
}

.custom-button-sorts {
  --background: rgb(54, 91, 148);
  border-top-left-radius: 0; /* Remove top-left rounded corner */
  border-bottom-left-radius: 0; 
}

.custom-button.date-button {
  border-top-left-radius: 0; /* Remove top-left rounded corner */
  border-bottom-left-radius: 0; /* Remove bottom-left rounded corner */
}

.euro-button {
  border-radius: 0;
  border-top-left-radius: 0; /* Remove top-left rounded corner */
  border-bottom-left-radius: 0; /* Remove bottom-left rounded corner */
}
.arrow-button {
  border-top-left-radius: 0; /* Remove top-left rounded corner */
  border-bottom-left-radius: 0; /* Remove bottom-left rounded corner */
}
</style>
