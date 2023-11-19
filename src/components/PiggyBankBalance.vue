<template>
    <ion-col>
        <div class="container">
            <div>
                <span>Piggy Bank</span>
                <h1 :class="{'balance': piggyBankBalance !=0}">{{ balanceFormatted }}</h1>
            </div>
        </div>
    </ion-col>
</template>
  
<script setup >
    import {inject, onMounted, ref, computed, onUnmounted} from 'vue';
    import { IonCol } from '@ionic/vue';

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

<style scoped>
    /* .container{
        display: flex;
        justify-content: start;
    } */

    .balance{
        font-weight: 700;
        font-size: 30px;
        padding: 0;
        margin: 0;
    }

    span{
        font-size: 15px;
        font-weight: 200;
    }

</style>
  