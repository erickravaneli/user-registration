<script setup>
import { ref } from 'vue'
import PersonalName from '@/components/form/PersonalName.vue'
import Cpf from '@/components/form/Cpf.vue'
import DateOfBirth from '@/components/form/DateOfBirth.vue'
import Phone from '@/components/form/Phone.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['click-forward', 'click-back'])
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isPersonalNameValid = ref(false)
const isCpfValid = ref(false)
const isDateOfBirthValid = ref(false)
const isPhoneValid = ref(false)
const finished = ref(false)

const moveForward = () => {
  finished.value = true
  if (
    isPersonalNameValid.value &&
    isCpfValid.value &&
    isDateOfBirthValid.value &&
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
      <PersonalName
        v-model="user.personalName"
        v-model:isFieldValid="isPersonalNameValid"
        :finished
      />
      <Cpf v-model="user.cpf" v-model:isFieldValid="isCpfValid" :finished />
      <DateOfBirth v-model="user.dateOfBirth" v-model:isFieldValid="isDateOfBirthValid" :finished />
      <Phone v-model="user.phone" v-model:isFieldValid="isPhoneValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Continuar</Button>
    </div>
  </div>
</template>
