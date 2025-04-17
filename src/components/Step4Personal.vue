<script setup>
import { ref } from 'vue'
import Email from '@/components/form/Email.vue'
import PersonalName from '@/components/form/PersonalName.vue'
import Cpf from '@/components/form/Cpf.vue'
import DateOfBirth from '@/components/form/DateOfBirth.vue'
import Phone from '@/components/form/Phone.vue'
import Password from '@/components/form/Password.vue'
import Button from '@/components/Button.vue'
import { userService } from '../services/user'

const emit = defineEmits(['click-forward', 'click-back'])
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isEmailValid = ref(false)
const isPersonalNameValid = ref(false)
const isCpfValid = ref(false)
const isDateOfBirthValid = ref(false)
const isPhoneValid = ref(false)
const isPasswordValid = ref(false)
const finished = ref(false)

const moveForward = async () => {
  finished.value = true
  if (
    isEmailValid.value &&
    isPersonalNameValid.value &&
    isCpfValid.value &&
    isDateOfBirthValid.value &&
    isPhoneValid.value &&
    isPasswordValid.value
  ) {
    try {
      const user = {
        email: props.user.email,
        personalName: props.user.personalName,
        cpf: props.user.cpf,
        dateOfBirth: props.user.dateOfBirth,
        phone: props.user.phone,
        password: props.user.password
      }
      await userService.register(user)
      alert('Usuário cadastrado com sucesso!')
    } catch (error) {
      alert(error)
    }
  }
}
const moveBack = () => {
  emit('click-back')
}
</script>

<template>
  <div>
    <div class="form-group">
      <Email v-model="user.email" v-model:isFieldValid="isEmailValid" :finished />
      <PersonalName
        v-model="user.personalName"
        v-model:isFieldValid="isPersonalNameValid"
        :finished
      />
      <Cpf v-model="user.cpf" v-model:isFieldValid="isCpfValid" :finished />
      <DateOfBirth v-model="user.dateOfBirth" v-model:isFieldValid="isDateOfBirthValid" :finished />
      <Phone v-model="user.phone" v-model:isFieldValid="isPhoneValid" :finished />
      <Password v-model="user.password" v-model:isFieldValid="isPasswordValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Cadastrar</Button>
    </div>
  </div>
</template>
