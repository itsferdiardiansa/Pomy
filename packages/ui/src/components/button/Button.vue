<template>
  <button :class="cls" :disabled="disabled || isLoading" @click="handleClick">
    <div :class="`${prefixClass}-button--wrapper`">
      <template v-if="icon.length">
        <!-- <div :class="`${prefixClass}-button--icon`" v-if="!isLoading">
          <font-awesome-icon :icon="icon" ref="iconElement" />
        </div> -->
      </template>

      <template v-if="hasSlot || label.length">
        <div
          :class="[`${prefixClass}-button--label`, { 'has-icon': icon.length }]"
          v-if="!isLoading"
        >
          <slot>
            {{ label }}
          </slot>
        </div>

        <div :class="`${prefixClass}-button--spinner`" v-else>
          <Spinner :width="20" :height="20" />
        </div>
      </template>
    </div>
  </button>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { Spinner } from '@/components/loader/spinner'
import { prefixClass } from '@/constants'
import defaultProps from './props'
import type { ButtonTypes } from './props'

const props = withDefaults(defineProps<ButtonTypes>(), defaultProps)
const emit = defineEmits(['click'])
const slots = useSlots()
let iconElement = ref()

const getVariantCls = prefixbtnCls => {
  const { inverse, variant } = props
  let btnCls = `${prefixbtnCls}--${variant}`

  if (inverse) btnCls += '-inverse'

  return btnCls
}

const cls = computed(() => {
  const { size, disabled, rounded, bold, pill } = props
  const btnCls = prefixClass.concat('-button')
  let cls = [btnCls]

  cls.push(getVariantCls(btnCls))

  if (size) cls.push(btnCls.concat('--' + size))

  if (pill) cls.push('pill')
  else if (!rounded) cls.push('no-rounded')

  if (disabled) cls.push('disabled')

  return [cls.join(' ')]
})

const handleClick = e => {
  const { disabled } = props

  if (disabled) return

  emit('click', e)
}

const hasSlot = computed(() => !!slots.default)
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.#{$prefixClass}-button {
  @apply h-9 focus:outline-none rounded px-3 transition duration-300 relative;
  @apply hover:bg-gray-300 text-gray-800 overflow-hidden whitespace-nowrap;

  @include variant;

  @include size;

  &.no-rounded {
    @apply rounded-none;
  }

  &.pill {
    @apply rounded-full;
  }

  &.disabled {
    @apply disabled:opacity-70 cursor-not-allowed;
  }

  &--wrapper {
    @apply h-full flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--label {
    @apply font-bold;

    &.has-icon {
      @apply ml-2;
    }
  }

  &--spinner {
    @apply w-full h-full flex items-center justify-center;
  }
}
</style>
