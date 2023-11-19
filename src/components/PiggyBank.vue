<template>      
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Piggy Bank Vault</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-row>
            <ion-col size="12" style="display:flex; justify-content: center; align-items: center; gap: 5px">
                <b>Total Balance:</b>
                <b>{{balanceFormatted}}</b>
            </ion-col>
            <ion-col size="12" style="display:flex; justify-content: center; align-items: center; gap: 5px">
                <div class="transfer-card">
                    <span class="transfer-card-title">Available Balance</span>
                    <span class="transfer-card-value">{{availableBalanceFormatted}}</span>
                </div>
                <div class="flow-transfer-container">
                    <ion-button fill="clear" style="border-radius: 20px; padding:0; background-color: rgb(37, 203, 224);" @click="switchFlow">
                        <ion-icon style="font-size: 30px;" color="light" :icon="balanceFlowDirectionIcon"></ion-icon>
                    </ion-button>
                </div>
                <div class="transfer-card">
                    <span class="transfer-card-title">Piggy Bank Balance</span>
                    <span class="transfer-card-value">{{piggyBankBalanceFormatted}}</span>
                </div>
            </ion-col>
            <ion-col size="3" offset="4">
                <ion-input type="number" placeholder="0,00" v-model="totalVault" style="font-size:30px"></ion-input>
            </ion-col>
            <ion-col>
              <span style="font-size:40px">€</span>
            </ion-col>
        </ion-row> 
        <ion-row>
            <ion-col size="12" style="display:flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px">
                
                <ion-button @click="applyChanges">Apply</ion-button> 
                <ion-label style="color: red; font-size: 12px"  v-if="errors && errors.piggy_bank_balance">
                    {{ errors.piggy_bank_balance[0] }}
                </ion-label>
          </ion-col>
        </ion-row>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, inject, computed, onMounted } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonInput, IonRow, IonCol, IonButton, IonTitle } from '@ionic/vue';
  import { arrowDownOutline, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
  
  const axios = inject('axios')
 const errors = ref({})

  const formatter = new Intl.NumberFormat('pt', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

   const isWithdrawingFromAvailableBalance = ref(true)

   const vCard = ref({
    balance: null,
    piggy_bank_balance: null,
   })

   const totalVault = ref(0); // Example starting amount


   const availableBalance = computed(() => vCard.value.balance - vCard.value.piggy_bank_balance)

   const balanceFlowDirectionIcon = computed(() => isWithdrawingFromAvailableBalance.value ? arrowForwardOutline : arrowBackOutline) 

   const newBalance = computed(() => {
       if(isWithdrawingFromAvailableBalance.value){
        const formattedNumber = formatter.format(parseFloat(totalVault.value) + parseFloat(vCard.value.piggy_bank_balance));
        return `New Avaliable balance: ${formattedNumber} €`; // Add the Euro symbol to the right
       } else {
        const formattedNumber = formatter.format(parseFloat(totalVault.value) + availableBalance.value);
        return `New piggy Bank balance: ${formattedNumber} €`; // Add the Euro symbol to the right

       }
   })

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


    const props = defineProps({
        phone: {
            type: String,
            required: true
        }
    });

    const getVCard = () => {
        axios.get(`/vcard/${props.phone}`).then((response) => {
            const {balance, piggy_bank_balance} = response.data.data
            vCard.value.balance = balance
            vCard.value.piggy_bank_balance = piggy_bank_balance

        });
    }

    const updatePiggyBankBalance = async(piggy_bank_balance) => {
        errors.value = {}
        try{
            const response = await axios.patch(`/vcards/${props.phone}/updatePiggyBankBalance`, {
                piggy_bank_balance: formatter.format(piggy_bank_balance).replace(',', '.')
            })
            console.log(response)
            vCard.value.balance = response.data.data.balance
            vCard.value.piggy_bank_balance = response.data.data.piggy_bank_balance
        }
        catch(error){
            if (error.response.status === 422){
                errors.value = error.response.data.errors
            }
            console.log(error)
        }
    }

    onMounted(() => {
        getVCard();
    });

    const applyChanges = async () => {


      let piggy_bank_balance = undefined
      if (isWithdrawingFromAvailableBalance.value){
        piggy_bank_balance = parseFloat(vCard.value.piggy_bank_balance) + parseFloat(totalVault.value)
      }else{
        piggy_bank_balance = parseFloat(vCard.value.piggy_bank_balance) - parseFloat(totalVault.value)
      }

      await updatePiggyBankBalance(piggy_bank_balance)
    };

    const cancelChanges = () => {
    // Cancel changes logic
    };

    const switchFlow = () => {
        isWithdrawingFromAvailableBalance.value = !isWithdrawingFromAvailableBalance.value
    };
  </script>
  
   <style scoped>
    .container{
      display:flex;
      justify-content: center;
      align-items: center;
    }

    span{
      font-size: 12px;
    }
    
    .transfer-card{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 5px;
      border: 1px solid #000;
      border-radius: 10px;
    }

   </style>

  