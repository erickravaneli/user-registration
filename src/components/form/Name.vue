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
  userType: {
    type: String,
    required: true,
    validator: (value) => {
      return ['personal', 'business'].includes(value)
    }
  },
  finished: {
    type: Boolean,
    default: false
  }
})
const isPersonalUser = props.userType === 'personal'
const emit = defineEmits(['update:modelValue', 'update:isFieldValid'])
const { model } = useModelValue(props, emit)

const { isValid, errorMessage, validate } = useValidation(model, emit, {
  required: true
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
    <label class="label" for="name">{{ isPersonalUser ? 'Nome' : 'Razão social' }}</label>
    <input class="input" type="text" id="name" v-model="model" />
    <p v-if="finished && !isValid" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
