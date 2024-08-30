<template>
  <div :class="[`${prefixClass}-modal--body`, { 'auto-width': autoWidth }]" ref="modalEl">
    <div :class="`${prefixClass}-modal--panel`" v-bind="customPanel">
      <div :class="`${prefixClass}-modal--panel-content`">
        <h3 class="content-header" v-if="title || $slots.header">
          <slot name="header">
            {{ title }}
          </slot>
        </h3>

        <div class="content-desc">
          <component :is="getContent" />
        </div>
      </div>
    </div>

    <div ref="modalFooterEl" :class="getFooterClass" v-if="footer">
      <component :is="getFooter" />
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance, h, inject, onMounted, ref } from 'vue'
import ModalDefaultFooter from './ModalFooter.vue'

export default {
  name: 'PLModal',
  props: {
    name: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Object, Function],
      default: ''
    },
    customPanel: {
      type: Object,
      default: () => {}
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    footer: {
      type: [Boolean, Object, Function],
      default: ModalDefaultFooter
    },
    footerAlign: {
      type: String,
      default: ''
    },
    withConfirmation: {
      type: Boolean,
      default: true
    },
    onConfirmFn: {
      type: Function,
      default: () => {}
    },
    onCancelFn: {
      type: Function,
      default: () => {}
    },
    afterClose: {
      type: Function,
      default: () => {}
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onConfirm', 'onCancel'],
  setup(props, { slots }) {
    const modalContext = inject('modalContext')
    const root = getCurrentInstance()
    const modalEl = ref()
    const modalBodyEl = ref()
    const modalFooterEl = ref()
    const modalConfirmBtnEl = ref()
    const modalCancelBtnEl = ref()

    const handleConfirm = () => {
      toggleModal()
      props.onConfirmFn(hideModal)
    }

    const handleCancel = () => {
      hideModal()
      props.onCancelFn()
    }

    const toggleModal = () => {
      if (props.closeable) hideModal()
    }

    const hideModal = () => {
      setTimeout(() => {
        modalContext.emitter.emit('hide-modal', props)
      }, 100)
    }

    const getContent = computed(() => {
      const { content } = props
      let childContent = {}

      if (typeof content === 'string' && content) {
        childContent = h('label', {}, content)

        return childContent
      } else if (typeof content === 'function') return content

      return content ? content : slots.default
    })

    const getFooter = computed(() => {
      const { footer } = props

      if (slots.footer) return slots.footer

      if (typeof footer !== 'boolean' && footer.name === 'PLModalFooterDefault') {
        return h(footer, { handleConfirm, handleCancel })
      }

      return h(footer, { hideModal })
    })

    const getFooterClass = computed(() => {
      const { prefixClass } = root.data
      const { footerAlign } = props
      let footerClass = [`${prefixClass}-modal--footer`]

      if (footerAlign) footerClass.push(`align-${footerAlign}`)

      return footerClass
    })

    onMounted(() => {
      if (Reflect.has(modalContext, 'pushModal') && modalContext !== undefined) {
        modalContext.pushModal(root.vnode, modalEl)
      }
    })

    return {
      modalEl,
      modalBodyEl,
      modalFooterEl,
      modalConfirmBtnEl,
      modalCancelBtnEl,
      hideModal,
      handleConfirm,
      handleCancel,
      toggleModal,
      getContent,
      getFooter,
      getFooterClass
    }
  }
}
</script>
