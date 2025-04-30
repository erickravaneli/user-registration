import { ref, computed, defineAsyncComponent } from 'vue'
import Step1 from '@/components/Step1.vue'
const Step2 = defineAsyncComponent(() => import('@/components/Step2.vue'))
const Step3 = defineAsyncComponent(() => import('@/components/Step3.vue'))
const Step4 = defineAsyncComponent(() => import('@/components/Step4.vue'))

export function useStepNavigation(user) {
  const currentStep = ref('1')
  const transitionName = ref('slide-left')
  const isPersonalUser = user.type === 'personal'

  const stepsMap = {
    1: {
      component: Step1,
      stepNumber: '1',
      title: 'Seja bem vindo(a)',
      moveForward: () => {
        currentStep.value = '2'
      },
      moveBack: () => {
        currentStep.value = '1'
      }
    },
    2: {
      component: Step2,
      stepNumber: '2',
      title: isPersonalUser ? 'Pessoa Física' : 'Pessoa Jurídica',
      moveForward: () => {
        currentStep.value = '3'
      },
      moveBack: () => {
        currentStep.value = '1'
      }
    },
    3: {
      component: Step3,
      stepNumber: '3',
      title: 'Senha de acesso',
      moveForward: () => {
        currentStep.value = '4'
      },
      moveBack: () => {
        currentStep.value = '2'
      }
    },
    4: {
      component: Step4,
      stepNumber: '4',
      title: 'Revise suas informações',
      moveForward: () => {},
      moveBack: () => {
        currentStep.value = '3'
      }
    }
  }

  const handleClickForward = () => {
    transitionName.value = 'slide-left'
    stepsMap[currentStep.value].moveForward()
  }

  const handleClickBack = () => {
    transitionName.value = 'slide-right'
    stepsMap[currentStep.value].moveBack()
  }

  const currentStepData = computed(() => stepsMap[currentStep.value])

  return {
    currentStep,
    transitionName,
    currentStepData,
    handleClickForward,
    handleClickBack
  }
}
