<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title style="font-size:18px">{{ balanceFormatted }}</ion-card-title>
            <ion-card-subtitle>Piggy Bank</ion-card-subtitle>
        </ion-card-header>
    </ion-card>
</template>

<script setup>
    import {inject, computed} from 'vue';
    import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

    const props = defineProps({
        phone: {
            type: String,
            required: true
        },
        piggyBankBalance: {
            type: Number,
            required: true
        }
    });

    const axios = inject('axios');

    const balanceFormatted = computed(() => {
        if (props.piggyBankBalance == undefined || props.piggyBankBalance == 0) {
            //escrever que nao tem saldo
            return 'No balance';
        }

        const formatter = new Intl.NumberFormat('pt', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const formattedNumber = formatter.format(props.piggyBankBalance);
        return `${formattedNumber} €`; // Add the Euro symbol to the right
    });


</script>
