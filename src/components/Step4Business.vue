<script setup>
import { ref } from 'vue'
import Email from '@/components/form/Email.vue'
import BusinessName from '@/components/form/BusinessName.vue'
import Cnpj from '@/components/form/Cnpj.vue'
import BusinessStartDate from '@/components/form/BusinessStartDate.vue'
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
const isBusinessNameValid = ref(false)
const isCnpjValid = ref(false)
const isBusinessStartDateValid = ref(false)
const isPhoneValid = ref(false)
const isPasswordValid = ref(false)
const finished = ref(false)

const moveForward = async () => {
  finished.value = true
  if (
    isEmailValid.value &&
    isBusinessNameValid.value &&
    isCnpjValid.value &&
    isBusinessStartDateValid.value &&
    isPhoneValid.value &&
    isPasswordValid.value
  ) {
    try {
      const user = {
        email: props.user.email,
        businessName: props.user.businessName,
        cnpj: props.user.cnpj,
        businessStartDate: props.user.businessStartDate,
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
      <Email v-model="user.email" :v-model:isFieldValid="isEmailValid" :finished />
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
      <Password v-model="user.password" v-model:isFieldValid="isPasswordValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Cadastrar</Button>
    </div>
  </div>
</template>
