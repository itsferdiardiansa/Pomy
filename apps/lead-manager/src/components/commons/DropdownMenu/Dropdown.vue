<template>
  <teleport to="body">
    <div
      ref="dialogEl"
      role="dialog"
      tabindex="0"
      :class="`${prefixClass}-dropdown`"
      @toggle-dropdown="handleToggleDropdown"
      v-if="visible && isApplicable"
    >
      <div :class="getWrapperClass">
        <div ref="contentEl" :class="`${prefixClass}-dropdown--content`" :style="getContentStyle">
          <div :class="`${prefixClass}-content--header`" v-if="$slots.header">
            <slot name="header" />
          </div>

          <div :class="`${prefixClass}-content--menu`" v-if="$slots.menu">
            <slot name="menu" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
/* eslint-disable */
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'
import DropdownItem from './DropdownItem.vue'
import debounce from '@/utils/debounce'

export default {
  components: {
    DropdownItem
  },
  emits: ['toggleDropdown'],
  props: {
    safeNode: {
      type: Function,
      default: () => ({})
    },
    strict: {
      type: Boolean,
      default: false // is strict position from safeNode
    }
  },
  created() {},
  setup(props, context) {
    const dialogEl = ref()
    const contentEl = ref()
    const visible = ref(false)
    const root = getCurrentInstance()

    const toggleDropdown = (e) => {
      visible.value = !visible.value
    }

    const isApplicable = computed(() => {
      const { safeNode } = props

      return Reflect.has(safeNode(), '__vnode')
    })

    const getContentStyle = computed(() => {
      const { strict } = props
      const node = props.safeNode()
      const content = unref(contentEl)
      const { top, left } = node.getBoundingClientRect()
      const { clientHeight, clientWidth } = node
      const marginTop = 7

      const leftPos = left + clientWidth - (content?.clientWidth || 0)
      const topPos = (strict ? top : node.offsetTop) + clientHeight + marginTop

      return {
        top: `${topPos}px`,
        left: `${leftPos}px`
      }
    })

    const getWrapperClass = computed(() => {
      const {
        data: { prefixClass }
      } = root
      const { strict } = props
      let customClass = [`${prefixClass}-dropdown--wrapper`]

      if (strict) customClass.push('wrapper-fixed')

      return customClass
    })

    const registerBlurEvent = debounce(() => {
      const {
        data: { prefixClass }
      } = root
      const safeNode = props.safeNode()

      if (!Reflect.has(safeNode, 'blurEventListener')) {
        safeNode.blurEventListener = (e) => {
          const el = e.target
          const parentEl = el.closest(`.${prefixClass}-dropdown`)

          if (visible.value && !parentEl) visible.value = false
        }

        document.addEventListener('click', safeNode.blurEventListener)
      }
    }, 50)

    const unregisterBlurEvent = debounce(() => {
      const safeNode = props.safeNode()

      document.removeEventListener('click', safeNode.blurEventListener, false)
      delete safeNode.blurEventListener
    }, 10)

    watch(
      () => visible.value,
      (value) => {
        value ? registerBlurEvent() : unregisterBlurEvent()
      }
    )

    return {
      dialogEl,
      contentEl,
      visible,
      isApplicable,
      toggleDropdown,
      getContentStyle,
      getWrapperClass
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-dropdown {
  @apply absolute top-0 left-0;
  width: 1px;
  height: 1px;
  z-index: 40;
  &--wrapper {
    &.wrapper-fixed {
      @apply fixed;
    }
  }

  &--content {
    @apply h-auto w-auto min-w-full absolute shadow-md rounded-sm bg-white p-2 overflow-x-hidden overflow-y-scroll box-content;
    max-height: calc(100vh - 5rem);

    .#{$prefixClass}-content {
      &--header {
        @apply pb-3 border-b border-gray-200;
      }

      &--menu {
        @apply py-1;
      }
    }
  }
}
</style>
