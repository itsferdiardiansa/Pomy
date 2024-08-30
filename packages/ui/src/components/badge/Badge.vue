<template>
  <div v-bind="$attrs" :class="cls">
    <div :class="`${prefixClass}-badge--wrapper`" v-if="!dot">
      <template v-if="icon.length">
        <div :class="`${prefixClass}-badge--icon`">
          <font-awesome-icon :icon="icon" ref="iconElement" />
        </div>
      </template>

      <template v-if="hasSlot || label.length">
        <div
          :class="[`${prefixClass}-badge--label`, { 'has-icon': icon.length }]"
        >
          <slot>
            {{ label }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, useSlots, ref } from 'vue'
import { prefixClass } from '@/constants'
import defaultProps from './props'
import type { BadgeTypes } from './props'

const props = withDefaults(defineProps<BadgeTypes>(), defaultProps)
const slots = useSlots()
let iconElement = ref()

const getVariantClass = prefixBtnClass => {
  const { inverse, variant } = props
  let btnClass = `${prefixBtnClass}--${variant}`

  if (inverse) btnClass += '-inverse'

  return btnClass
}

const cls = computed(() => {
  const { size, rounded, pill, dot } = props
  const btnClass = prefixClass.concat('-badge')
  let cls = [btnClass]

  cls.push(getVariantClass(btnClass))

  if (size) cls.push(btnClass.concat('--' + size))

  if (pill) cls.push('pill')
  else if (!rounded) cls.push('no-rounded')

  if (dot) cls.push('dot')

  return [cls.join(' ')]
})

const hasSlot = computed(() => !!slots.default)
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.#{$prefixClass}-badge {
  @apply h-9 focus:outline-none rounded px-3 transition duration-300 relative inline-block;
  @apply text-gray-800 overflow-hidden whitespace-nowrap;

  @include variant;

  @include size;

  &.no-rounded {
    @apply rounded-none;
  }

  &.pill {
    @apply rounded-full;
  }

  &.disabled {
    @apply disabled:opacity-70 pointer-events-none;
  }

  &--wrapper {
    @apply h-full flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--label {
    &.has-icon {
      @apply ml-2;
    }
  }
}
</style>
