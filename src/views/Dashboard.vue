<script>
import { personCircleOutline, settingsOutline } from 'ionicons/icons';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">
        <div v-if="loading || !pinCorrect">
          <ion-spinner></ion-spinner>
        </div>
        <div v-else>
          <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>
          <ion-grid>

            <ion-row>
              <!-- First Column: Welcome, {{ phone }} -->
              <ion-col size="6">
                <div>
                  Welcome, {{ phone }}
                </div>
              </ion-col>
            
              <!-- Second Column: User and Settings icons inside styled ion-buttons -->
              <ion-col size="6">
                <div class="ion-text-end"> <!-- Align content to the end (right) -->
                  <ion-button :router-link="vcardUrl" size="small" style="height: 38px;" color="dark">
                    <ion-icon :icon="personCircleOutline"></ion-icon>
                  </ion-button>
            
                  <ion-button :router-link="settingsUrl" size="small" style="height: 38px;" color="dark">
                    <ion-icon :icon="settingsOutline"></ion-icon>
                  </ion-button>
                </div>
              </ion-col>
              <ion-col size="6">
                <ion-button :router-link="notificationsUrl" fill="clear" style="width:100%;">
                  <ion-card>
                    <ion-card-header></ion-card-header>
                    <ion-card-subtitle>Notifications</ion-card-subtitle>
                    <ion-chip>
                      <ion-avatar>
                        <img src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png" />
                      </ion-avatar>
                      <ion-label v-if="numNotifications > 0">
                        <ion-badge slot="end" color="danger">{{ numNotifications }}</ion-badge>
                      </ion-label>
                    </ion-chip>
                  </ion-card>
                </ion-button>
              </ion-col>
            </ion-row>
            
            
            

            <ion-row>
              <ion-col size="6">
                <Balance :phone="phone" :balance="balance"></Balance>
              </ion-col>
              <ion-col size="6">
                <PiggyBankBalance :phone="phone" :piggyBankBalance="piggyBankBalance"></PiggyBankBalance>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <ion-button :router-link="sendMoneyUrl" style="width:100%;" fill="clear">
                  <ion-card>
                    <div class="ion-card-img-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor"
                        class="bi bi-send" viewBox="0 0 16 16">
                        <path
                          d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                    </div>
                    <ion-card-header>
                      <ion-card-title>Send Money</ion-card-title>
                    </ion-card-header>
                  </ion-card>
                </ion-button>
              </ion-col>
              <ion-col size="6">
                <ion-button :router-link="piggyBankUrl" fill="clear" style="width:100%;">
                  <ion-card>
                    <div class="ion-card-img-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                        class="bi bi-piggy-bank" viewBox="0 0 16 16">
                        <path
                          d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
                        <path fill-rule="evenodd"
                          d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z" />
                      </svg>
                    </div>
                    <ion-card-header>
                      <ion-card-title>Piggy Bank</ion-card-title>
                    </ion-card-header>
                  </ion-card>
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12">
                <LastTransaction :phone="phone"></LastTransaction>
              </ion-col>
            </ion-row>
          </ion-grid>

        </div>
      </div>

      <ModalPin :is-open="!pinCorrect" @checkPin="checkPin"></ModalPin>
    </ion-content>

  </ion-page>
</template>

<script setup>
import { ref, inject, onBeforeMount, computed, onMounted } from "vue";
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  onIonViewWillEnter,
  IonRow,
  IonGrid,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useRouter } from "vue-router";

import ModalPin from "../components/ModalPin.vue";
import Balance from "../components/Balance.vue";
import LastTransaction from "../components/LastTransaction.vue";
import PiggyBankBalance from '../components/PiggyBankBalance.vue';
import ContactList from "../components/ContactList.vue";
import { useRoute } from 'vue-router';


const axios = inject("axios");

const route = useRoute();

const phone = ref(route.params.phoneNumber);
const loading = ref(false);
const pinCorrect = ref(false);
const balance = ref(null);
const piggyBankBalance = ref(null);
const numNotifications = ref();


const transactionUrl = computed(() => {
  return `/transactions/${phone.value}`;
});
const vcardUrl = computed(() => {
  return `/mydetails/${phone.value}`;
});
const settingsUrl = computed(() => {
  return `/settings/${phone.value}`;
});

const piggyBankUrl = computed(() => {
  return `/piggyBank/${phone.value}`;
});

const sendMoneyUrl = computed(() => {
  return '/mycontacts';
});

const notificationsUrl = computed(() => {
  return `/notifications/${phone.value}`;
});

const getBalance = async() => {
    const response = await axios.get(`/vcard/${phone.value}`)
    balance.value = response.data.data.balance;
}

const getPiggyBankBalance = async() => {
    const response = await axios.get(`/vcard/${phone.value}`)
    piggyBankBalance.value = response.data.data.piggy_bank_balance;
}

const getNotifications = async() => {
  const response = await axios.get(`vcards/${phone.value}/notifications`)
  numNotifications.value = response.data.data
      .filter(notification => notification.notification_read == false)
      .length;
}


const checkPin = async (pin) => {
  const store = new Storage();
  await store.create();
  const pinSaved = await store.get("pin");
  if (pinSaved == pin) {
    pinCorrect.value = true;
    console.log("pin correct");
  }
};


const handleRefresh = async(event) => {
  try{
    await getBalance();
    await getPiggyBankBalance();
    await getNotifications();
  }catch(error){
    console.log(error);
  }
  event.target.complete();
};

onMounted(() => {
  getBalance();
  getPiggyBankBalance();
  getNotifications();
})

onIonViewWillEnter(()=>{
  getBalance();
  getPiggyBankBalance();
  getNotifications();
})

</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

ion-card-title {
  font-size: 18px;
}

ion-card-header {
  padding: 5px;
  width: 100%;
}

ion-card {
  width: 100%;
  margin: 0;
}

.ion-card-img-container {
  min-height: 105px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
