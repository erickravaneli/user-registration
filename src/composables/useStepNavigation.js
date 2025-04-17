import { ref, computed, defineAsyncComponent } from 'vue'
import Step1 from '@/components/Step1.vue'
const Step2Personal = defineAsyncComponent(() => import('@/components/Step2Personal.vue'))
const Step2Business = defineAsyncComponent(() => import('@/components/Step2Business.vue'))
const Step3 = defineAsyncComponent(() => import('@/components/Step3.vue'))
const Step4Personal = defineAsyncComponent(() => import('@/components/Step4Personal.vue'))
const Step4Business = defineAsyncComponent(() => import('@/components/Step4Business.vue'))

export function useStepNavigation(user) {
  const currentStep = ref('1')
  const transitionName = ref('slide-left')

  const stepsMap = {
    1: {
      component: Step1,
      stepNumber: '1',
      title: 'Seja bem vindo(a)',
      moveForward: () => {
        currentStep.value = user.type === 'personal' ? '2personal' : '2business'
      },
      moveBack: () => {
        currentStep.value = '1'
      }
    },
    '2personal': {
      component: Step2Personal,
      stepNumber: '2',
      title: 'Pessoa Física',
      moveForward: () => {
        currentStep.value = '3'
      },
      moveBack: () => {
        currentStep.value = '1'
      }
    },
    '2business': {
      component: Step2Business,
      stepNumber: '2',
      title: 'Pessoa Jurídica',
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
        currentStep.value = user.type === 'personal' ? '4personal' : '4business'
      },
      moveBack: () => {
        currentStep.value = user.type === 'personal' ? '2personal' : '2business'
      }
    },
    '4personal': {
      component: Step4Personal,
      stepNumber: '4',
      title: 'Revise suas informações',
      moveForward: () => {
        console.log('Final step reached!')
      },
      moveBack: () => {
        currentStep.value = '3'
      }
    },
    '4business': {
      component: Step4Business,
      stepNumber: '4',
      title: 'Revise suas informações',
      moveForward: () => {
        console.log('Final step reached!')
      },
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
