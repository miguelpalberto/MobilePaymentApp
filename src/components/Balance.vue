<template>
    <div class="container">
        <div>
            <span>Balance</span>
            <h1 :class="{'balance': balance !=0}">{{ balanceFormatted }}</h1>
        </div>
    </div>
</template>
  
<script setup >
    import {inject, onMounted, ref, computed} from 'vue';

    const props = defineProps({
        phone: {
            type: String,
            required: true
        }
    });

    const axios = inject('axios');

    const balance = ref('');




    const balanceFormatted = computed(() => {

        if (balance.value == 0) {
            //escrever que nao tem saldo
            return 'No balance';
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
            // balance.value = "0.00"
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

    .balance{
        font-weight: 700;
        font-size: 40px;
        padding: 0;
        margin: 0;

    }

    span{
        font-size: 15px;
        font-weight: 200;
    }

</style>
  