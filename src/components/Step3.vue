<script setup>
import { ref } from 'vue'
import Password from '@/components/form/Password.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['click-forward', 'click-back'])
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isPasswordValid = ref(false)
const finished = ref(false)

const moveForward = () => {
  finished.value = true
  if (isPasswordValid.value) {
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
      <Password v-model="user.password" v-model:isFieldValid="isPasswordValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Continuar</Button>
    </div>
  </div>
</template>
