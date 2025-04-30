<script setup>
import { ref, watch } from 'vue'
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
  minLength: 4
})

const showPassword = ref(false)

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
    <label class="label" for="password">Sua senha</label>
    <input class="input" :type="showPassword ? 'text' : 'password'" id="password" v-model="model" />
    <div class="checkbox-group">
      <input type="checkbox" class="checkbox" id="showPassword" v-model="showPassword" />
      <label for="showPassword" class="label">Mostrar senha</label>
    </div>
    <p v-if="finished && !isValid" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
