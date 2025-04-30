<script setup>
import { ref } from 'vue'
import Email from '@/components/form/Email.vue'
import Name from '@/components/form/Name.vue'
import Document from '@/components/form/Document.vue'
import EntityStartDate from '@/components/form/EntityStartDate.vue'
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
const isNameValid = ref(false)
const isDocumentValid = ref(false)
const isEntityStartDate = ref(false)
const isPhoneValid = ref(false)
const isPasswordValid = ref(false)
const finished = ref(false)

const moveForward = async () => {
  finished.value = true
  if (
    isEmailValid.value &&
    isNameValid.value &&
    isDocumentValid.value &&
    isEntityStartDate.value &&
    isPhoneValid.value &&
    isPasswordValid.value
  ) {
    try {
      const user = {
        email: props.user.email,
        name: props.user.name,
        document: props.user.document,
        entityStartDate: props.user.entityStartDate,
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
      <Name
        v-model="user.name"
        v-model:isFieldValid="isNameValid"
        :user-type="user.type"
        :finished
      />
      <Document
        v-model="user.document"
        v-model:isFieldValid="isDocumentValid"
        :user-type="user.type"
        :finished
      />
      <EntityStartDate
        v-model="user.entityStartDate"
        v-model:isFieldValid="isEntityStartDate"
        :user-type="user.type"
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
