<script setup>
import { ref } from 'vue'
import Name from '@/components/form/Name.vue'
import Document from '@/components/form/Document.vue'
import EntityStartDate from '@/components/form/EntityStartDate.vue'
import Phone from '@/components/form/Phone.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['click-forward', 'click-back'])
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const isNameValid = ref(false)
const isDocumentValid = ref(false)
const isEntityStartDateValid = ref(false)
const isPhoneValid = ref(false)
const finished = ref(false)

const moveForward = () => {
  finished.value = true
  if (
    isNameValid.value &&
    isDocumentValid.value &&
    isEntityStartDateValid.value &&
    isPhoneValid.value
  ) {
    emit('click-forward')
  }
}

const moveBack = () => {
  emit('click-back')
}
</script>

<template>
  <div>
    <div class="form-group">
      <Name
        v-model="user.name"
        v-model:isFieldValid="isNameValid"
        :user-type="user.type"
        :finished
      />
      <Document
        v-model="user.document"
        v-model:isFieldValid="isDocumentValid"
        :user-type="user.type"
        :finished
      />
      <EntityStartDate
        v-model="user.entityStartDate"
        v-model:isFieldValid="isEntityStartDateValid"
        :user-type="user.type"
        :finished
      />
      <Phone v-model="user.phone" v-model:isFieldValid="isPhoneValid" :finished />
    </div>
    <div class="button-group">
      <Button type="secondary" @click="moveBack">Voltar</Button>
      <Button @click="moveForward">Continuar</Button>
    </div>
  </div>
</template>
