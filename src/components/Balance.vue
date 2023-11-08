<template>
    <div class="container">
        <h1>{{ balanceFormatted }}</h1>
    </div>
</template>
  
<script setup >
    import {inject, onMounted, ref, computed} from 'vue';

    import { IonContent } from '@ionic/vue';
    const axios = inject('axios');

    const balance = ref('');


    const balanceFormatted = computed(() => {
    const formatter = new Intl.NumberFormat('pt', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedNumber = formatter.format(balance.value);
    return `${formattedNumber} €`; // Add the Euro symbol to the right
});

    const getBalance = () => {
        axios.get('/vcard/900000001').then((response) => {
            console.log(response.data.data.balance);
            balance.value = response.data.data.balance;
        });
    }

    onMounted(() => {
        // getBalance();
        getBalance();
        // console.log(axios.defaults.headers.common.Authorization )
    });


</script>

<style scoped>
    .container{
        display: flex;
        justify-content: end;
        padding: 50px;
    }

    h1{
        /* font-size: 50px; */
        font-weight: 700;
        /* color: #000; */
    }
</style>
  