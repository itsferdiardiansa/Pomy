<template>
  <template v-for="item in items" :key="item._id">
    <transition :name="item.animation" appear>
      <div :class="customClass(item.variant)" v-if="item.isShow">
        <div :class="`${prefixClass}-notification--icon`" v-if="item.withIcon">
          <font-awesome-icon :icon="['fa', getIconVariant(item.variant)]" />
        </div>

        <div :class="`${prefixClass}-notification--wrapper`">
          <div
            :class="`${prefixClass}-notification--close`"
            @click="closeAlert(item._id)"
            v-if="item.closeable"
          >
            <font-awesome-icon :icon="['fa', 'times']" />
          </div>

          <div :class="`${prefixClass}-notification--title`" v-if="item.title">
            <label v-html="item.title"></label>
          </div>

          <div :class="`${prefixClass}-notification--content`">
            <component :is="getContent(item.content)" />
          </div>
        </div>
      </div>
    </transition>
  </template>
</template>
<script>
/* eslint-disable */
import { computed, createVNode, getCurrentInstance, inject, reactive } from 'vue'

export default {
  props: {
    inverse: {
      type: Boolean,
      default: false
    }
  },
  setup(_, { slots }) {
    let root = getCurrentInstance()
    let notificationContext = inject('notificationContext')
    let timeout = {}
    let items = reactive([])
    let defaultOptions = {
      title: null,
      content: null,
      variant: 'light',
      duration: 3000,
      closeable: false,
      animation: 'slide-top',
      once: false,
      withIcon: true,
      iconSuffix: {},
      onClose: () => {}
    }

    notificationContext.emitter.on('show-notification', (params = {}) => {
      const key = new Date().getTime()
      const duration = params?.duration || defaultOptions.duration

      if (!params?.closeable) setAlertDuration(key, duration)

      items.push({
        _id: key,
        isShow: true,
        ...defaultOptions,
        ...params
      })
    })

    const findItemId = (key) => items.findIndex((item) => item._id === key)

    const getVariantClass = (prefixAlertClass, variant) => {
      let alertClass = `${prefixAlertClass}--${variant}`

      return alertClass
    }

    const getIconVariant = (variant) => {
      const icons = {
        success: 'check-circle',
        warning: 'exclamation-triangle',
        danger: 'exclamation-circle',
        dark: 'question-circle',
        light: 'exclamation-circle',
        primary: 'bullhorn'
      }

      return icons[variant]
    }

    const customClass = (variant) => {
      const { prefixClass } = root.data
      const alertClass = `${prefixClass}-notification`
      let _class = [alertClass]

      _class.push(getVariantClass(alertClass, variant))

      return [_class.join(' ')]
    }

    const hasSlot = computed(() => !!slots.default)

    const removeItem = (key) => {
      const index = findItemId(key)

      items[index].onClose()

      clearTimeout(timeout[key])
      delete timeout[key]

      setTimeout(() => items.splice(index, 1), 100)
    }

    const setAlertDuration = (key, duration) => {
      Object.assign(timeout, {
        [key]: setTimeout(() => {
          closeAlert(key)
        }, duration)
      })
    }

    const closeAlert = (key) => {
      const index = findItemId(key)

      Object.assign(items[index], { isShow: false })

      removeItem(key)
    }

    const getContent = (content) => {
      if (typeof content === 'object' && content) {
        if (Reflect.has(content, '__v_isVNode')) {
          return content
        }
      } else if (typeof content === 'function') return content

      return createVNode('label', {}, content)
    }

    return {
      items,
      customClass,
      hasSlot,
      closeAlert,
      getContent,
      getIconVariant
    }
  }
}
</script>
<style lang="scss">
@import './variant.scss';

.#{$prefixClass}-notification {
  @apply w-full md:max-w-sm h-auto bg-light rounded-md p-3 transition duration-300 relative mx-auto;
  @apply text-gray-800 overflow-hidden mt-2 shadow-md text-sm flex;
  z-index: 99;

  @include screen-md {
    width: 400px;
  }

  @include variant;

  &--wrapper {
    @apply h-full px-3 flex items-center flex-grow-0;
    min-height: 20px;
  }

  &--close {
    @apply absolute right-3.5 top-4 cursor-pointer;

    svg {
      @apply w-3;
    }
  }

  &--icon {
    @apply w-5 flex items-center;
  }

  &--title {
    label {
      @apply mx-0 text-lg;
      line-height: unset;
    }
  }

  &--content {
  }
}
</style>
