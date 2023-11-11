<template>
<div class="bottom-box">
        <div class="transaction-last">Last Transaction:</div>
        <div class="transaction-info">
          <div class="transaction-title"><p>{{ lastTransactionReference }}</p></div>
          <!-- <div class="transaction-amount"> -->

    <div class="transaction-amount">
            <p>{{ lastTransactionValue }}</p>
    </div>
              <!-- </div> -->
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
    //const allTransactions = ref([]);
    const lastTransactionValue = ref('');
    const lastTransactionReference = ref('');

    const getLastTransaction = () => {

    
        axios.get(`vcards/${props.phone}/transactions/latest`).then((response) => {
            lastTransactionValue.value = response.data.data.value;
            lastTransactionReference.value = response.data.data.payment_reference;
            console.log(response)

        })
        .catch ((error) => {
            if (error.response.status == 422) {
                console.log("Erro")
                lastTransactionReference.value = "No transactions yet"
            }
            console.log(error)
        })
    }

    
    onMounted(() => {
        getLastTransaction();
        // console.log(axios.defaults.headers.common.Authorization )
    });

</script>





<style scoped>
    .container{
        display: flex;
        justify-content: end;
        padding: 50px;
    }

    span{
        font-size: 15px;
        font-weight: 200;
    }

    .transaction-amount {
        align-items: right;
        /*color: white;*/
     }



.transaction-title {
  font-weight: bold;
  margin-right: 10px; /* Adjust the spacing between title and amount */
  /*margin-left: 10px;*/
}
.transaction-info {
  display: flex;
  justify-content: space-between; /* Align "Transaction X" and "-135€" to each end */
  align-items: center; /* Center elements vertically */
  width: 100%; /* Ensure the container takes the full width */
}
</style>
  