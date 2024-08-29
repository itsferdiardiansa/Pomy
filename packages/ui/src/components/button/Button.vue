<template>
  <button :class="customCls">
    {{ label }}

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

// ========= Types ===========
const ButtonVariants = ['primary'] as const
const ButtonShape = ['default', 'round']
const ButtonSize = ['medium', 'large']

type Props = {
  label: string
  ghost?: boolean
  bold?: boolean
  variant?: (typeof ButtonVariants)[number]
  shape?: (typeof ButtonShape)[number]
  size?: (typeof ButtonSize)[number]
}

const $style = useCssModule()
const props = withDefaults(defineProps<Props>(), {
  label: 'Label',
  variant: 'primary',
  shape: 'default',
  size: 'medium',
  ghost: false,
  bold: false,
})

const getVariant = (key: Props['variant']) => {
  const btnVariants = {
    primary: 'btn-primary',
  }

  return btnVariants[key]
}

const customCls = computed(() => {
  const { variant, ghost, shape, size, bold } = props

  return [
    $style['btn'],
    $style[getVariant(variant)],
    bold && $style['bold'],
    ghost && $style['ghost'],
    $style[shape],
    $style[size],
  ]
})
</script>
<style lang="scss" module>
.btn {
  padding: 12px 28px;
  border-radius: 8px;
  line-height: 24px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  gap: 8px;
}
</style>
