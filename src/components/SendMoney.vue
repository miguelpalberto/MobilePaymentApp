
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
            <ion-modal v-if="showSuccessModal" :is-open="showSuccessModal">
                <ion-content class="ion-text-center">
                    <ion-card>
                        <ion-card-content>
                            <ion-icon :icon="paperPlaneOutline" style="font-size:64px; color: green" ></ion-icon>
                            <p>{{ inputValue }} sent to {{ name }}</p>
                        </ion-card-content>
                    </ion-card>
                    <ion-button expand="full" color="success" @click="closeModal">Continue</ion-button>
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
                        <ion-col size="12">
                            <ion-label position="floating">Confirmation Code</ion-label>
                            <ion-input type="password" placeholder="Enter your Confirmation Code" :maxlength="3"
                                @ion-input="validateFormData" v-model="sendMoneyRequest.confirmation_code"
                                :disabled="isLoading"></ion-input>
                            <ion-text v-if="errors && errors.confirmation_code" color="danger">
                                {{ errors.confirmation_code[0] }}
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

const sendMoneyRequest = ref({
    vcard: route.params.phoneNumber,
    value: 0,
    pair_vcard: props.pairPhone,
    confirmation_code: '',
    autoSave: false
})

const vCard = ref(null)
const errors = ref({
    value: [],
    confirmation_code: []
})
const isFormValid = ref(false)
const isLoading = ref(false)
const inputValue = ref(null)
const showSuccessModal = ref(false)

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

    if (!sendMoneyRequest.value.confirmation_code) {
        isValid = false;
        errors.value.confirmation_code.push('You must enter a your confirmation code');
    }

    isFormValid.value = isValid;
}

const createTransaction = () => {
    isLoading.value = true;
    axios.post('/transactions', sendMoneyRequest.value).then((response) => {
        isLoading.value = false;
        showSuccessModal.value = true;
    }).catch((error) => {
        isLoading.value = false;
        errors.value = error.response.data.errors;
    })
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
    showSuccessModal.value = false;
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
    removeMask('#inputValue')
})




</script>