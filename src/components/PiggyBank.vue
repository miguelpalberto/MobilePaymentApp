<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Piggy Bank Vault</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- Success Modal -->
    <ion-content :fullscreen="true">
      <br>
      <ion-modal v-if="showSuccessModal" :is-open="showSuccessModal">
        <ion-content class="ion-text-center">
          <ion-card>
            <ion-card-content>
              <ion-card-title>Success</ion-card-title>
              <p>Balances have been updated!</p>
            </ion-card-content>
          </ion-card>
          <ion-button expand="full" color="success" @click="closeModal">Close</ion-button>
        </ion-content>
      </ion-modal>
      <ion-row>
        <ion-col size="12" style="display:flex; justify-content: center; align-items: center; gap: 5px">
          <b>Total Balance:</b>
          <b>{{ balanceFormatted }}</b>
        </ion-col>
        <ion-col size="12" style="display:flex; justify-content: center; align-items: center; gap: 5px">
          <div class="transfer-card">
            <h4 class="ion-text-center">Available Balance</h4>
            <h5 class="transfer-card-value">{{ availableBalanceFormatted }}</h5>
          </div>
          <div class="flow-transfer-container">
            <ion-button fill="clear" style="border-radius: 15px; padding:0; background-color: rgb(37, 203, 224);"
              @click="switchFlow">
              <ion-icon style="font-size: 30px;" color="light" :icon="balanceFlowDirectionIcon"></ion-icon>
            </ion-button>
          </div>
          <div class="transfer-card">
            <h4 class="ion-text-center">Piggy Bank Balance</h4>
            <h5 class="transfer-card-value">{{ piggyBankBalanceFormatted }}</h5>
          </div>
        </ion-col>
        <ion-col size="12" style="display:flex; justify-content: center;">
          <input id="inputValue" type="text" style="text-align: center; font-size:30px;" placeholder="0,00€"
            v-model="inputValue">
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12"
          style="display:flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px">
          <ion-button v-if="isApplyButtonVisible" @click="applyChanges">Apply</ion-button>
          <ion-label style="color: red; font-size: 14px" v-if="errors && errors.piggy_bank_balance">
            {{ errors.piggy_bank_balance[0] }}
          </ion-label>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { ref, inject, computed, onMounted, onBeforeUnmount } from 'vue';
import { IonPage, IonModal, IonCard, IonCardContent, IonCardTitle, IonHeader, IonToolbar, IonContent, IonIcon, IonLabel, IonRow, IonCol, IonButton, IonTitle } from '@ionic/vue';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import { setMask, removeMask, formatToNumber } from 'simple-mask-money'

// import axios from 'axios';
const axios = inject('axios')

const props = defineProps({
  phone: {
    type: String,
    required: true
  }
});

const isWithdrawingFromAvailableBalance = ref(true)
const errors = ref({})
const inputValue = ref(null);
const showSuccessModal = ref(false);
const vCard = ref({
  balance: null,
  piggy_bank_balance: null,
})

const formatter = new Intl.NumberFormat('pt', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const isApplyButtonVisible = computed(() => {
  return actualValue.value || actualValue.value > 0
})
const actualValue = computed(() => {
  return formatToNumber(inputValue.value)
})
const availableBalance = computed(() => vCard.value.balance - vCard.value.piggy_bank_balance)
const balanceFlowDirectionIcon = computed(() => isWithdrawingFromAvailableBalance.value ? arrowForwardOutline : arrowBackOutline)
const balanceFormatted = computed(() => {
  const formattedNumber = formatter.format(vCard.value.balance);
  return `${formattedNumber} €`; // Add the Euro symbol to the right
})
const availableBalanceFormatted = computed(() => {
  const formattedNumber = formatter.format(availableBalance.value);
  return `${formattedNumber} €`; // Add the Euro symbol to the right
})
const piggyBankBalanceFormatted = computed(() => {
  const formattedNumber = formatter.format(vCard.value.piggy_bank_balance);
  return `${formattedNumber} €`; // Add the Euro symbol to the right
})


const getVCard = () => {
  axios.get(`/vcard/${props.phone}`).then((response) => {
    const { balance, piggy_bank_balance } = response.data.data
    vCard.value.balance = balance
    vCard.value.piggy_bank_balance = piggy_bank_balance

  });
}

const updatePiggyBankBalance = async (piggy_bank_balance) => {
  errors.value = {}
  try {
    const response = await axios.patch(`/vcards/${props.phone}/updatePiggyBankBalance`, {
      piggy_bank_balance: piggy_bank_balance
    })
    vCard.value.balance = response.data.data.balance
    vCard.value.piggy_bank_balance = response.data.data.piggy_bank_balance
    inputValue.value = null
    showSuccessModal.value = true
  }
  catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors
    }
  }
}

onMounted(() => {
  setMask('#inputValue',
    {
      suffix: '€',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
    })

  getVCard();
});

onBeforeUnmount(() => {
  removeMask('#inputValue')
})

const applyChanges = async () => {
  let piggy_bank_balance = undefined
  if (isWithdrawingFromAvailableBalance.value) {
    piggy_bank_balance = parseFloat(vCard.value.piggy_bank_balance) + actualValue.value
  } else {
    piggy_bank_balance = parseFloat(vCard.value.piggy_bank_balance) - actualValue.value
  }

  piggy_bank_balance = piggy_bank_balance.toFixed(2)
  await updatePiggyBankBalance(piggy_bank_balance)
};


const switchFlow = () => {
  isWithdrawingFromAvailableBalance.value = !isWithdrawingFromAvailableBalance.value
};

const closeModal = () => {
  showSuccessModal.value = false
}


</script>
  
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  font-size: 12px;
}

.transfer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 0 10px;
  border: 1px solid #000;
  border-radius: 10px;
}
</style>

  