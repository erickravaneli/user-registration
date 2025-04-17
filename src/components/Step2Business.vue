<script setup>
import { ref } from 'vue'
import BusinessName from '@/components/form/BusinessName.vue'
import Cnpj from '@/components/form/Cnpj.vue'
import BusinessStartDate from '@/components/form/BusinessStartDate.vue'
import Phone from '@/components/form/Phone.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['click-forward', 'click-back'])
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isBusinessNameValid = ref(false)
const isCnpjValid = ref(false)
const isBusinessStartDateValid = ref(false)
const isPhoneValid = ref(false)
const finished = ref(false)
const moveForward = () => {
  finished.value = true
  if (
    isBusinessNameValid.value &&
    isCnpjValid.value &&
    isBusinessStartDateValid.value &&
    isPhoneValid.value
  ) {
    emit('click-forward')
  }
}

const moveBack = () => {
  emit('click-back')
}
</script>

<template>
  <div>
    <div class="form-group">
      <BusinessName
        v-model="user.businessName"
        v-model:isFieldValid="isBusinessNameValid"
        :finished
      />
      <Cnpj v-model="user.cnpj" v-model:isFieldValid="isCnpjValid" :finished />
      <BusinessStartDate
        v-model="user.businessStartDate"
        v-model:isFieldValid="isBusinessStartDateValid"
        :finished
      />
      <Phone v-model="user.phone" v-model:isFieldValid="isPhoneValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Continuar</Button>
    </div>
  </div>
</template>
