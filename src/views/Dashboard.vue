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
          <div class="balance">
            <Balance :phone="phone"></Balance>
          </div>

          <div class="container">
            <div class="middle-box" id="middle-box-1">1</div>
            <div class="middle-box" id="middle-box-2">2</div>
          </div>
          <div class="container">
            <div class="middle-box" id="middle-box-3">3</div>
            <div class="middle-box" id="middle-box-3">4</div>
          </div>

          <LastTransaction :phone="phone"></LastTransaction>
        </div>
      </div>

      <ModalPin :is-open="!pinCorrect" @checkPin="checkPin"></ModalPin>
    </ion-content>
  </ion-page>
</template>






<script setup>
import { ref, inject, onBeforeMount } from "vue";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  onIonViewWillEnter,
} from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useRouter } from "vue-router";

import ModalPin from "../components/ModalPin.vue";
import Balance from "../components/Balance.vue";
import LastTransaction from "../components/LastTransaction.vue";

const phone = ref("");
const loading = ref(true);
const pinCorrect = ref(false);

const axios = inject("axios");

const router = useRouter();

onIonViewWillEnter(async () => {
  const store = new Storage();
  await store.create();
  const token = await store.get("token");
  if (!token) {
    router.push("/login");
  } else {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    const phoneNumber = await store.get("phone_number");
    console.log("phone number", phoneNumber);
    if (phoneNumber) {
      phone.value = phoneNumber;
    }
    loading.value = false;
  }
});

const checkPin = async (pin) => {
  const store = new Storage();
  await store.create();
  const pinSaved = await store.get("pin");
  if (pinSaved == pin) {
    pinCorrect.value = true;
    console.log("pin correct");
  }
};
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
.balance {
  padding-left: 130px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}

.bottom-box {
  background-color: rgb(43, 43, 61);
  padding: 10px;
  display: flex;
  flex-direction: column; /* Set to column to stack elements vertically */
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid #1e5ca3;
  margin: 10px;
}

.middle-box {
  background-color: rgb(43, 43, 61);
  padding: 10px;
  flex: 1; /* Use flex: 1 to make the boxes expand and take available space */
  border: 2px solid #1e5ca3;
  margin: 10px;
  max-width: calc(
    50% - 20px
  ); /* Adjust max-width to control the width of each box */
  box-sizing: border-box;
  height: 150px; /* Adjust the height as needed */
}
</style>
