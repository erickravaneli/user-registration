import { expect, describe, it, vi } from 'vitest'
import { ref } from 'vue'
import { useValidation } from './useValidation'

describe('useValidation', () => {
  it('deve validar o campo obrigatório corretamente', () => {
    const valueRef = ref('')
    const emit = vi.fn()

    const rules = { required: true }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(false)
    expect(errorMessage.value).toBe('Este campo é obrigatório')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', false)
  })

  it('deve validar o campo email corretamente', () => {
    const valueRef = ref('invalid-email')
    const emit = vi.fn()
    const rules = { email: true }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(false)
    expect(errorMessage.value).toBe('Email inválido')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', false)
  })

  it('deve validar o campo minLength corretamente', () => {
    const valueRef = ref('abc')
    const emit = vi.fn()
    const rules = { minLength: 5 }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(false)
    expect(errorMessage.value).toBe('Mínimo de 5 caracteres')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', false)
  })

  it('deve validar o campo date corretamente', () => {
    const valueRef = ref('31/12/2023')
    const emit = vi.fn()
    const rules = { date: true }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(true)
    expect(errorMessage.value).toBe('')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', true)
  })

  it('deve validar o campo cpf corretamente', () => {
    const valueRef = ref('123.456.789-00')
    const emit = vi.fn()
    const rules = { cpf: true }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(true)
    expect(errorMessage.value).toBe('')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', true)
  })

  it('deve validar o campo cnpj corretamente', () => {
    const valueRef = ref('12.345.678/0001-00')
    const emit = vi.fn()
    const rules = { cnpj: true }
    const { isValid, errorMessage, validate } = useValidation(valueRef, emit, rules)

    validate()

    expect(isValid.value).toBe(true)
    expect(errorMessage.value).toBe('')
    expect(emit).toHaveBeenCalledWith('update:isFieldValid', true)
  })
})
