<script setup>
import { reactive } from 'vue'
import { useStepNavigation } from '@/composables/useStepNavigation.js'

const user = reactive({
  type: 'personal', // 'personal' or 'business'
  email: '',
  name: '',
  document: '',
  entityStartDate: '',
  phone: '',
  password: ''
})

const { currentStep, transitionName, currentStepData, handleClickForward, handleClickBack } =
  useStepNavigation(user)
</script>

<template>
  <div class="register">
    <h3 class="step-text">
      Etapa <span class="current-step">{{ currentStepData.stepNumber }}</span> de 4
    </h3>
    <h2>{{ currentStepData.title }}</h2>

    <div class="wrapper">
      <Transition :name="transitionName" mode="out-in">
        <component
          :is="currentStepData.component"
          :key="currentStep"
          @click-forward="handleClickForward"
          @click-back="handleClickBack"
          :user
        />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('@/assets/styles/slide-transition.scss');

.register {
  width: 400px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-top: 0;
  }

  .step-text {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
    .current-step {
      color: orange;
      font-weight: bold;
    }
  }

  .wrapper {
    position: relative;
    min-height: 700px;
  }
}
</style>
