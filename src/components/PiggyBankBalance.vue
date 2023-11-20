<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title style="font-size:18px">{{ balanceFormatted }}</ion-card-title>
            <ion-card-subtitle>Piggy Bank</ion-card-subtitle>
        </ion-card-header>
    </ion-card>
</template>

<script setup>
    import {inject, onMounted, ref, computed, onUnmounted} from 'vue';
    import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

    const props = defineProps({
        phone: {
            type: String,
            required: true
        }
    });

    const axios = inject('axios');
    const piggyBankBalance = ref('');

    const balanceFormatted = computed(() => {
        if (piggyBankBalance == undefined || piggyBankBalance.value == 0) {
            //escrever que nao tem saldo
            return 'No balance';
        }

        const formatter = new Intl.NumberFormat('pt', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const formattedNumber = formatter.format(piggyBankBalance.value);
        return `${formattedNumber} €`; // Add the Euro symbol to the right
    });

    const getPiggyBankBalance = () => {
        axios.get(`/vcard/${props.phone}`).then((response) => {
            piggyBankBalance.value = response.data.data.piggy_bank_balance;
        });
    }

    let interval = null;
    onMounted(() => {
        interval = setInterval(() => {
            getPiggyBankBalance();
        }, 3000);
        getPiggyBankBalance();
        
    });

    onUnmounted(() => {
        clearInterval(interval);
    })

</script>
