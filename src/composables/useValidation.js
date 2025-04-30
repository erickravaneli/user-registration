import { ref } from 'vue'

export function useValidation(valueRef, emit, rules = {}) {
  const isValid = ref(false)
  const errorMessage = ref('')

  const validate = () => {
    const value = valueRef.value?.toString() || ''

    if (rules.required && !value) {
      isValid.value = false
      errorMessage.value = 'Este campo é obrigatório'
      emit('update:isFieldValid', isValid.value)
      return isValid.value
    }

    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid.value = false
        errorMessage.value = 'Email inválido'
        emit('update:isFieldValid', isValid.value)
        return isValid.value
      }
    }

    if (rules.minLength && value.length < rules.minLength) {
      isValid.value = false
      errorMessage.value = `Mínimo de ${rules.minLength} caracteres`
      emit('update:isFieldValid', isValid.value)
      return isValid.value
    }

    if (rules.date) {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
      if (!dateRegex.test(value)) {
        isValid.value = false
        errorMessage.value = 'Data inválida'
        emit('update:isFieldValid', isValid.value)
        return isValid.value
      }
    }

    if (rules.cpf) {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
      if (!cpfRegex.test(value)) {
        isValid.value = false
        errorMessage.value = 'CPF inválido'
        emit('update:isFieldValid', isValid.value)
        return isValid.value
      }
    }

    if (rules.cnpj) {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
      if (!cnpjRegex.test(value)) {
        isValid.value = false
        errorMessage.value = 'CNPJ inválido'
        emit('update:isFieldValid', isValid.value)
        return isValid.value
      }
    }

    if (rules.phone) {
      const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/
      if (!phoneRegex.test(value)) {
        isValid.value = false
        errorMessage.value = 'Telefone inválido'
        emit('update:isFieldValid', isValid.value)
        return isValid.value
      }
    }

    isValid.value = true
    errorMessage.value = ''
    emit('update:isFieldValid', isValid.value)
    return isValid.value
  }

  return { isValid, errorMessage, validate }
}
