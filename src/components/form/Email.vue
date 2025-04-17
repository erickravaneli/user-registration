<script setup>
import { watch } from 'vue'
import { useModelValue } from '@/composables/useModelValue'
import { useValidation } from '@/composables/useValidation'

const props = defineProps({
  modelValue: {
    required: true
  },
  isFieldValid: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'update:isFieldValid'])
const { model } = useModelValue(props, emit)

const { isValid, errorMessage, validate } = useValidation(model, emit, {
  required: true,
  email: true
})

watch(
  model,
  () => {
    validate()
  },
  { immediate: true }
)
</script>

<template>
  <div class="form-group">
    <label class="label" for="email">Endereço de e-mail</label>
    <input class="input" type="email" id="email" v-model="model" />
    <p v-if="finished && !isValid" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
