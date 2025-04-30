import { computed } from 'vue'

export function useModelValue(props, emit) {
  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  return { model }
}
