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
            <div class="filters">
            <ion-button class="custom-button-filters" @click="openModal" expand="block" fill="solid">
                Filters
                <ion-badge color="danger" >2</ion-badge>
              </ion-button>
            </div>
             <div class="sorts">


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
  modalController,
  IonBadge
} from "@ionic/vue";
import { calendarOutline, logoEuro, caretDownOutline, caretUpOutline } from "ionicons/icons";
import TransactionsFiter from './TransactionsFilter.vue'

import { inject, ref, onMounted, computed} from "vue";

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

const filterByDate = ref(null);



const toogleAscDesc = () => {
  if (ascDesc.value == 'asc'){
    ascDesc.value = 'desc';
  }else{
    ascDesc.value = 'asc';
  }
}

const transactionFilteredAndSorted = computed(() => {
  // Primeiro, aplique o filtro de data se existir
  let filteredTransactions = transactions.value;
  if (filterByDate.value && filterByDate.value.startDate && filterByDate.value.endDate) {
    filteredTransactions = filteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.datetime);
      const startDate = new Date(filterByDate.value.startDate);
      const endDate = new Date(filterByDate.value.endDate);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  // Agora aplique o filtro de ordenação
  if (sortBy.value === 'date') {
    // Ordenar por data
    filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);
      return ascDesc.value === 'asc' ? dateA - dateB : dateB - dateA;
    });
  } else if (sortBy.value === 'value') {
    // Ordenar por valor
    filteredTransactions.sort((a, b) => {
      const valorA = parseFloat(a.value.replace('€', ''));
      const valorB = parseFloat(b.value.replace('€', ''));
      return ascDesc.value === 'asc' ? valorB - valorA : valorA - valorB;
    });
  }

  // Retorna as transações filtradas e ordenadas
  return filteredTransactions;
});





const openModal = async () => {
    const modal = await modalController.create({
      component: TransactionsFiter,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    filterByDate.value = data;

  };



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
// Listen for the custom event from TransactionsFilter component
const handleFilterSelection = (data) => {
  selectedFilters.value = data;
  // Perform any additional actions based on the selected filters
};


</script>

<style>
.container{
  display: flex;
}
.filters{
    flex: 1;
    justify-content:flex-start;
    padding-right: 20px;
    
  }
.sorts{
    justify-content:flex-end;
  }
.custom-button-filters{ 
    --background: rgb(54, 91, 148);
  }
.custom-button-sorts {
  --background: rgb(54, 91, 148);
}

ion-badge {
    position: absolute; 
    font-size: 10pt;
    right: -16px;
    top: -13px; 

}


/* Setting Overflow Visible */
ion-button.custom-class::part(native) {
    overflow: visible;
}
</style>
