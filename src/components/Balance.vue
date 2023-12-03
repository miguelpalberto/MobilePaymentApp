<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title style="font-size:18px">{{ balanceFormatted }}</ion-card-title>
            <ion-card-subtitle>Balance</ion-card-subtitle>
        </ion-card-header>
    </ion-card>
</template>

<script setup >
import { inject, onMounted, ref, computed, onUnmounted } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
const axios = inject('axios');

const props = defineProps({
    phone: {
        type: String,
        required: true
    }
});

const balance = ref('');
const balanceFormatted = computed(() => {

    if (balance.value == 0) {
        //escrever que nao tem saldo
        return 'No funds';
    }

    const formatter = new Intl.NumberFormat('pt', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedNumber = formatter.format(balance.value);
    return `${formattedNumber} €`; // Add the Euro symbol to the right
});

const getBalance = () => {
    axios.get(`/vcard/${props.phone}`).then((response) => {
        console.log(response.data.data.balance);
        balance.value = response.data.data.balance;
    })
}

let interval = null;
onMounted(() => {
    interval = setInterval(() => {
        getBalance();
    }, 3000);
    getBalance();
})

onUnmounted(() => {
    clearInterval(interval);
})

</script>
