<script setup>
import { ref } from 'vue'
import Email from '@/components/form/Email.vue'
import UserType from '@/components/form/UserType.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['click-forward', 'click-back'])
defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isEmailValid = ref(false)
const finished = ref(false)

const moveForward = () => {
  finished.value = true
  if (isEmailValid.value) {
    emit('click-forward')
  }
}
</script>

<template>
  <div>
    <div class="form-group">
      <Email v-model="user.email" v-model:isFieldValid="isEmailValid" :finished />
      <UserType v-model="user.type" />
    </div>
    <div class="button-group">
      <Button @click="moveForward" block>Continuar</Button>
    </div>
  </div>
</template>
