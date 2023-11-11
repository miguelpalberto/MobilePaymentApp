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
                <div v-if="transactions.length > 0">
                    <ion-list>
                        <ion-item>
                            <ion-label><b>Date</b></ion-label>
                            <ion-label><b>Value</b></ion-label>
                            <ion-label><b>Payment Type</b></ion-label>
                            <ion-label><b>Payment Reference</b></ion-label>
                        </ion-item>
                        <ion-item v-for="transaction in transactions">
                            <ion-label>{{ transaction.datetime }}</ion-label>
                            <ion-label>{{ transaction.value }}</ion-label>
                            <ion-label>{{ transaction.payment_type }}</ion-label>
                            <ion-label>{{ transaction.payment_reference }}</ion-label>
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

<script setup >
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue';
import { inject, ref, onMounted } from 'vue';
//import { Transaction } from '../components/Transaction.vue';

const props = defineProps({
    phone: {
        type: String,
        required: true
    }
});

const axios = inject('axios');
const isLoading = ref(true);
const transactions = ref([]);

onMounted(() => {
    axios.get(`vcards/${props.phone}/transactions`).then((response) => {
        transactions.value = response.data.data;
        console.log(transactions.value)
        isLoading.value = false;
    })
        .catch((error) => {
            console.log(error)
        })
});



</script>