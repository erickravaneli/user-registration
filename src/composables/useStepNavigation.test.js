import { describe, it, expect, beforeEach } from 'vitest'
import { useStepNavigation } from '@/composables/useStepNavigation'

const createUser = (type = 'personal') => ({
  type,
  email: '',
  name: '',
  document: '',
  entityStartDate: '',
  phone: '',
  password: ''
})

describe('useStepNavigation', () => {
  let navigation

  beforeEach(() => {
    navigation = useStepNavigation(createUser())
  })

  it('deve iniciar no step 1', () => {
    expect(navigation.currentStep.value).toBe('1')
  })

  it('deve ir para o step 2', () => {
    navigation.handleClickForward()
    expect(navigation.currentStep.value).toBe('2')
  })

  it('deve avançar e voltar corretamente', () => {
    navigation.handleClickForward()
    expect(navigation.currentStep.value).toBe('2')

    navigation.handleClickForward()
    expect(navigation.currentStep.value).toBe('3')

    navigation.handleClickBack()
    expect(navigation.currentStep.value).toBe('2')
  })

  it('deve alterar o transitionName para slide-left quando avançar', () => {
    navigation.handleClickForward()
    expect(navigation.transitionName.value).toBe('slide-left')
  })

  it('deve alterar o transitionName para slide-right quando voltar', () => {
    navigation.handleClickForward()
    navigation.handleClickBack()
    expect(navigation.transitionName.value).toBe('slide-right')
  })

  it('deve chegar até o último step (ignorando a validação dos campos)', () => {
    navigation.handleClickForward()
    navigation.handleClickForward()
    navigation.handleClickForward()
    expect(navigation.currentStep.value).toBe('4')
  })
})
