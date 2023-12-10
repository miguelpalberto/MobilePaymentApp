
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Send Money</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-modal v-if="showConfirmationModal" :is-open="showConfirmationModal">
                <ion-content class="ion-text-center">
                    <ion-grid class="vertically-center-aligned">
                        <ion-row class="vertically-center-aligned" v-if="!isTransactionSuccessful">
                            <div class="w-100">
                                <ion-card>
                                    <ion-card-content>
                                        <br>
                                        <br>
                                        <ion-icon :icon="paperPlaneOutline" style="font-size:64px; color: black"></ion-icon>
                                        <br>
                                        <br>
                                        <br>
                                        <p style="font-size: 18px; color: black;">Sending {{ inputValue }} </p>
                                        <p style="font-size: 18px; color: black;">to {{ name }} ({{ pairPhone }})</p>
                                        <br>
                                        <br>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="w-100" style="display:flex; flex-direction: column; justify-content: center;">
                                <label for="inputCode">Confirmation Code</label>
                                <br>
                                <input id="inputCode" type="password" placeholder="Enter your Confirmation Code"
                                    maxlength="3" @input="validateConfirmationCode"
                                    v-model="sendMoneyRequest.confirmation_code"
                                    style="text-align: center; font-size:20px; width: 100%" :disabled="isLoading" />
                                    <br>
                                <ion-text v-if="errors && errors.confirmation_code" color="danger">
                                    {{ errors.confirmation_code[0] }}
                                </ion-text>
                            </div>
                            <div class="w-100">
                                <ion-button expand="full" color="primary" :disabled="!isConfirmationCodeValid || isLoading"
                                    @click="createTransactionConfirmed">Confirm</ion-button>
                                <ion-button expand="full" color="dark" :disabled="isLoading"
                                    @click="cancel">Cancel</ion-button>
                            </div>
                        </ion-row>
                        <ion-row class="vertically-center-aligned" v-else>
                            <div class="w-100">
                                <ion-card>
                                    <ion-card-content>
                                        <br>
                                        <br>
                                        <ion-icon :icon="paperPlaneOutline" style="font-size:64px; color: green"></ion-icon>
                                        <br>
                                        <br>
                                        <p style="font-size: 17px; color: black;">Transaction Successful!</p>
                                        <br>
                                        <p>{{ inputValue }} sent to {{ name }} ({{ pairPhone }})</p>
                                        <br>
                                        <p> {{ decimasSupostasTrue.toFixed(2) }}€ saved to your Piggy Bank Vault</p>
                                        <br>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="w-100">
                                <ion-button expand="full" color="success" @click="closeModal">Continue</ion-button>
                            </div>
                        </ion-row>
                    </ion-grid>
                </ion-content>
            </ion-modal>
            <div class="d-flex flex-column justify-content-space-between h-100">
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <h3><b>Available Balance: {{ availableBalanceFormatted }}</b></h3>
                    </ion-row>
                    <ion-row>
                        <ion-col size="12">
                            <ion-text><b>Send to:</b> {{ name }}</ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="12" style="display:flex; flex-direction: column; justify-content: center;">
                            <label for="inputValue">Amount</label>
                            <input id="inputValue" type="text" style="text-align: center; font-size:30px; width: 100%;"
                                @input="validateFormData" placeholder="0,00€" v-model="inputValue" :disabled="isLoading">
                            <ion-text v-if="errors && errors.value" color="danger">
                                {{ errors.value[0] }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-row class="ion-justify-content-center w-100" style="align-self: center;">
                    <ion-card class="w-100">
                        <ion-card-content style="display:flex; flex-direction: column; align-items: center;">
                            <!-- <ion-checkbox :disabled="!isFormValid || isLoading"
                                    v-model="sendMoneyRequest.autoSave">Auto save</ion-checkbox> -->
                            <ion-button :disabled="!isFormValid || isLoading" @click="createTransaction">
                                <ion-label class="ion-label-w-spinner">Send <ion-spinner
                                        v-if="isLoading"></ion-spinner></ion-label>
                            </ion-button>
                        </ion-card-content>
                    </ion-card>
                </ion-row>
            </div>
        </ion-content>
    </ion-page>
</template>
<style scoped>
.ion-label-w-spinner {
    display: flex;
    align-items: center;
    gap: 5px;
}

.vertical-align-content>* {
    display: flex !important;
    align-content: center !important;
    align-items: center !important;
}

.d-flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.justify-content-space-between {
    justify-content: space-between;
}

.justify-content-center {
    justify-content: center;
}

.align-items-center {
    align-items: center;
}

.h-100 {
    height: 100%;
}

ion-grid.vertically-center-aligned {
    height: 100%;
    overflow: hidden;
}

ion-row.vertically-center-aligned {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
}

.w-100 {
    width: 100%;
}
</style>
<script setup>
import { computed, onMounted, onBeforeUnmount, inject, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonGrid, IonRow, IonCol,
    IonCard, IonCardContent, IonCheckbox, IonButton, IonText,
    IonSpinner, IonLabel, IonInput, IonModal, IonIcon
} from '@ionic/vue';
import { setMask, removeMask, formatToNumber } from 'simple-mask-money'
import { paperPlaneOutline } from 'ionicons/icons';

const route = useRoute();
const router = useRouter();
const axios = inject('axios');
const props = defineProps({
    pairPhone: {
        type: String,
        required: true
    }
})

const createRequest = () => {
    return {
        vcard: route.params.phoneNumber,
        value: 0,
        pair_vcard: props.pairPhone,
        confirmation_code: '',
        autoSave: false
    }
}

const sendMoneyRequest = ref(createRequest())

const vCard = ref(null)
const errors = ref({
    value: [],
    confirmation_code: []
})
const isFormValid = ref(false)
const isConfirmationCodeValid = ref(false)
const isLoading = ref(false)
const inputValue = ref(null)
const showConfirmationModal = ref(false)
const isRequestSuccessful = ref(false)

const isTransactionSuccessful = computed(() => {
    return isRequestSuccessful.value && !errors.value.confirmation_code.length
})

const name = computed(() => {
    return route.query.name ?? props.pairPhone
})

const validateFormData = () => {

    errors.value.value = []
    errors.value.confirmation_code = []
    const actualValue = formatToNumber(inputValue.value)

    let isValid = true;

    if (!actualValue || actualValue <= 0) {
        isValid = false;
        errors.value.value.push('The amount must be greater than 0');
    }

    if (actualValue > availableBalance.value) {
        isValid = false;
        errors.value.value.push('You don\'t have enough balance to send this amount');
    }

    isFormValid.value = isValid;
}

const validateConfirmationCode = () => {
    errors.value.confirmation_code = []
    let isValid = true;

    if (!sendMoneyRequest.value.confirmation_code) {
        isValid = false;
        errors.value.confirmation_code.push('You must enter your confirmation code');
    }

    isConfirmationCodeValid.value = isValid;
}

const createTransaction = () => {
    showConfirmationModal.value = true;
    validateConfirmationCode();
}

const decimasSupostasTrue = ref(0);
const createTransactionConfirmed = () => {
    // isLoading.value = true;
    // axios.post('/transactions', sendMoneyRequest.value).then((response) => {
    //     isRequestSuccessful.value = true;
    //     isLoading.value = false;
    // }).catch((error) => {
    //     isLoading.value = false;
    //     errors.value = error.response.data.errors;
    // })
    isLoading.value = true;
    axios.post('/transactions', sendMoneyRequest.value).then((response) => {
        isRequestSuccessful.value = true;
        isLoading.value = false;

        // Auto-saving logic
        const totalBalance = response.data.new_balance;
        const transactionValue = sendMoneyRequest.value.value;

        const centimos = transactionValue - Math.floor(transactionValue);
        // Calculate the amount left until the next integer
        let decimasSupostas = 1 - centimos;
        // Round if necessary
        decimasSupostas = Math.round(decimasSupostas * 100) / 100;
        if (totalBalance >= decimasSupostas) {
            // Update the local vCard data (assuming vCard is reactive)
            vCard.value.balance = vCard.value.balance - decimasSupostas;
            vCard.value.piggy_bank_balance = vCard.value.piggy_bank_balance + decimasSupostas;
            decimasSupostasTrue.value = decimasSupostas;
            // Save the changes to the server if needed
            // axios.put(`/vcard/${route.params.phoneNumber}`, {
            //     balance: vCard.value.balance,
            //     piggy_bank_balance: vCard.value.piggy_bank_balance,
            // });
        }
    }).catch((error) => {
        console.log("catch lol: ");
        isLoading.value = false;
        errors.value = error.response.data.errors;
    });
}

const cancel = () => {
    showConfirmationModal.value = false;
    inputValue.value = null;
    router.go(-1);
}

watch(inputValue, (newValue) => {
    if (newValue) {
        if (!newValue) sendMoneyRequest.value.value = 0;
        else sendMoneyRequest.value.value = formatToNumber(newValue);
    }
})

const getVCard = () => {
    axios.get(`/vcard/${route.params.phoneNumber}`).then((response) => {
        vCard.value = response.data.data;
    })
}

const formatter = new Intl.NumberFormat('pt', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const availableBalance = computed(() => {
    if (!vCard.value) return 0;
    return (vCard.value.balance - vCard.value.piggy_bank_balance).toFixed(2)
})

const availableBalanceFormatted = computed(() => {
    const formattedNumber = formatter.format(availableBalance.value);
    return `${formattedNumber} €`;
})

const closeModal = () => {
    showConfirmationModal.value = false;
    router.go(-1);
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
    createRequest();
    isRequestSuccessful.value = false;
    removeMask('#inputValue')
})




</script>