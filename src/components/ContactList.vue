<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Contacts</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div v-if="isLoading" style="height: 100%; width: 100%; display:flex; align-items: center; 
    justify-content: center;">
                <ion-spinner style="width: 100px; height: 100px;"></ion-spinner>
            </div>
            <div v-else>

                <div>
                    <ion-list :inset="true">
                        <ion-item @click="openAddContactModal" :button="true">
                            <ion-icon color="success" slot="start" :icon="addCircleOutline" size="large"></ion-icon>
                            <ion-label>
                                <h1>Add New Contact</h1>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </div>
                <div v-if="contacts.length > 0">
                    <ion-list :inset="true">
                        <ion-item-sliding v-for="contact in contacts">
                            <ion-item v-if="contact.name.display && contact.phones && contact.phones.length > 0"
                                :button="true">
                                <ion-avatar aria-hidden="true" slot="start">
                                    <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </ion-avatar>
                                <ion-label>
                                    <h1>{{ contact.name.display }}</h1>
                                    <p>{{ contact.phones[0].number }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item-options slot="end">
                                <ion-item-option color="warning">
                                    <ion-icon slot="icon-only" :icon="pin"></ion-icon>
                                </ion-item-option>
                                <ion-item-option color="tertiary">
                                    <ion-icon slot="icon-only" :icon="share"></ion-icon>
                                </ion-item-option>
                                <ion-item-option color="danger" expandable="true">
                                    <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                    </ion-list>
                </div>
                <div v-else>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>No contacts</ion-card-title>
                            <ion-card-subtitle></ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>Please add contacts to your contacts list</ion-card-content>
                    </ion-card>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Contacts, PhoneType } from '@capacitor-community/contacts';
import {
    IonPage, IonHeader, IonToolbar, IonContent, IonLabel,
    IonItemSliding, IonAvatar, IonIcon, IonItem, IonItemOptions,
    IonItemOption, IonList, IonTitle, IonSpinner, isPlatform, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton, IonButtons,
    modalController
}
    from '@ionic/vue';
import { pin, share, trash, addCircleOutline } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';
import AddContactModal from './AddContactModal.vue';
const isLoading = ref(true);
const contacts = ref([]);

const contact1 = {
    name: { display: 'Afonso Cancela' },
    phones: [
        {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: '918821097',
        }
    ]
}

const contact2 = {
    name: { display: 'João Tavares' },
    phones: [
        {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: '900000001',
        }
    ]
}

const contact3 = {
    name: { display: 'Miguel Pedrosa Alberto' },
    phones: [
        {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: '900000002',
        }
    ]
}

const contact4 = {
    name: { display: 'João Miguel Antunes Carvalho da Silva' },
    phones: [
        {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: '900000003',
        }
    ]
}

const retrieveListOfContacts = async () => {
    const projection = {
        name: true,
        phones: true
    };

    const result = await Contacts.getContacts({
        projection,
    });

    return result.contacts
}

const openAddContactModal = async () => {
    const modal = await modalController.create({
        component: AddContactModal
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'add') {
        if (data.saveContact) {
            const newContact = {
                name: { display: data.name, given: data.name, family: '' },
                phones: [
                    {
                        type: PhoneType.Mobile,
                        label: 'mobile',
                        number: data.phoneNumber,
                    }
                ]
            }

            isLoading.value = true;
            if (Capacitor.isNativePlatform()) {
                await Contacts.createContact({ contact: newContact });
                contacts.value = await retrieveListOfContacts()
            }
            else {
                contacts.value.push(newContact);
            }
            isLoading.value = false;
        }

        //send money
    }
};

onMounted(async () => {
    if (Capacitor.isNativePlatform()) {
        contacts.value = await retrieveListOfContacts()
        isLoading.value = false;
    } else {
        console.log('web')
        contacts.value = [contact1, contact2, contact3, contact4]
        isLoading.value = false;
    }
})

</script>