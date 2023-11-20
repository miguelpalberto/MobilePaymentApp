<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title style="font-size:18px">Last Transaction</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <div class="transaction-info">
                <div class="transaction-title">
                    <p>{{ lastTransactionReference }}</p>
                </div>
                <div class="transaction-amount">
                    <p>{{ lastTransactionValue }}</p>
                </div>
            </div>
            <br>
            <ion-button :router-link="transactionUrl" style="width: 100%" v-if="showMoreTransactions">Show More</ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script setup >
import { inject, onMounted, ref, computed } from 'vue';
import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';

const props = defineProps({
    phone: {
        type: String,
        required: true
    }
});

const axios = inject('axios');
const lastTransactionValue = ref('');
const lastTransactionReference = ref('');
const totalTransactions = ref(0);
const showMoreTransactions = computed(() => {
    return totalTransactions.value > 0;
});

const transactionUrl = computed(() => {
    return `/transactions/${props.phone}`;
});

const getLastTransaction = () => {
    axios.get(`vcards/${props.phone}/transactions/latest`).then((response) => {
        console.log(response)
        lastTransactionValue.value = response.data.latestTransaction?.value ?? "No transactions yet"
        lastTransactionReference.value = response.data.latestTransaction?.payment_reference ?? ""
        totalTransactions.value = response.data.total
    })
        .catch((error) => {
            console.log(error)
        })
}


onMounted(() => {
    getLastTransaction();
    // console.log(axios.defaults.headers.common.Authorization )
});

</script>
<style scoped>
.container {
    display: flex;
    justify-content: end;
    padding: 50px;
}

span {
    font-size: 15px;
    font-weight: 200;
}

.transaction-amount {
    align-items: right;
    /*color: white;*/
}



.transaction-title {
    font-weight: bold;
    margin-right: 10px;
    /* Adjust the spacing between title and amount */
    /*margin-left: 10px;*/
}

.transaction-info {
    display: flex;
    justify-content: space-between;
    /* Align "Transaction X" and "-135€" to each end */
    align-items: center;
    /* Center elements vertically */
    width: 100%;
    /* Ensure the container takes the full width */
}
</style>
  