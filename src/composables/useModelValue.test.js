import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useModelValue } from '@/composables/useModelValue'

describe('useModelValue', () => {
  it('deve retornar o valor de modelValue corretamente', () => {
    const props = { modelValue: 'teste inicial' }
    const emit = vi.fn()

    const { model } = useModelValue(props, emit)

    expect(model.value).toBe('teste inicial')
  })

  it('deve emitir update:modelValue ao mudar o valor', () => {
    const props = { modelValue: 'inicial' }
    const emit = vi.fn()

    const { model } = useModelValue(props, emit)
    model.value = 'novo valor'

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'novo valor')
  })

  it('deve manter reatividade ao mudar modelValue', () => {
    const modelValue = ref('reativo')
    const props = {
      get modelValue() {
        return modelValue.value
      }
    }
    const emit = vi.fn()

    const { model } = useModelValue(props, emit)

    expect(model.value).toBe('reativo')
    modelValue.value = 'atualizado'
    expect(model.value).toBe('atualizado')
  })
})
