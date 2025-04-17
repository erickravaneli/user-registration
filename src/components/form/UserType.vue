<script setup>
import { useModelValue } from '@/composables/useModelValue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const { model } = useModelValue(props, emit)
</script>

<template>
  <div class="form-group">
    <div class="radio-group">
      <div class="radio-wrapper">
        <input
          type="radio"
          class="radio"
          id="personal"
          value="personal"
          name="userType"
          v-model="model"
        />
        <label for="personal" class="label">Pessoa física</label>
      </div>
      <div class="radio-wrapper">
        <input
          type="radio"
          class="radio"
          id="business"
          value="business"
          name="userType"
          v-model="model"
        />
        <label for="business" class="label">Pessoa jurídica</label>
      </div>
    </div>
  </div>
</template>
