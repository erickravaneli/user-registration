<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => {
      return ['primary', 'secondary'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <button class="btn" :class="[`btn-${type}`]" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  width: 100%;

  &.btn-secondary {
    background-color: #fff;
    border: 1px solid #f79e1b;
    color: #f79e1b;
  }

  &.btn-primary {
    background-color: #f79e1b;
    color: #fff;
    border: 1px solid #f79e1b;
  }
}
</style>
