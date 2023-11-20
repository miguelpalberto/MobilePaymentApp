
<template>
    <ion-modal :is-open="props.isOpen" :can-dismiss="!props.isOpen">
        <ion-item>
          <ion-label position="floating">Pin</ion-label>
          <ion-input type="password" v-model="pin"></ion-input>
        </ion-item>
        <ion-button color="medium" class="enter" expand="block" @click="checkPin">Enter</ion-button>
    </ion-modal>

</template>

<script lang="ts" setup>
  import {
    IonButton,
    IonModal,
    IonItem,
    IonLabel,
    IonInput,
  } from '@ionic/vue';
  import { ref } from 'vue';

 const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });

    //emit
    const emit = defineEmits(['checkPin']);

    const pin = ref('');
    const checkPin = () => {
      emit('checkPin', pin.value);
    };

</script>

<style>
  ion-modal {
    --height: 50%;
    --width: 90%;
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: rgb(14 116 144);
    --color: white;
  }

  .enter{
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
  }

</style>
