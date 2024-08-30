import {
  // computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  reactive,
  unref,
  // watch,
} from 'vue'

export type FormContextType = {
  getModel: () => Record<string, any>
  addField: <T>(p: T) => void
  addErrorField: <T>(p: T) => void
  removeErrorField: <T>(p: T) => void
}

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    on: {
      type: Function,
    },
  },
  emits: ['onValidateField'],
  setup(props, { emit }) {
    const root = getCurrentInstance()
    const fields = reactive([])
    const errorFields = reactive(new Set())

    const addField = childNode => {
      fields.push(childNode)
    }

    const addErrorField = field => {
      let key

      if (typeof field === 'object') {
        key = Object.keys(field)[0]

        // errorFields.add(key, true)
        errorFields.add(key)
      }
    }

    const removeErrorField = field => {
      if (errorFields.has(field)) errorFields.delete(field)
    }

    const validate = (...args) => {
      const callback = args.length && args !== undefined ? args[0] : () => null

      fields.forEach(field => {
        field.component.ctx.validate(null, errorMessage => {
          if (errorMessage !== null) {
          }
        })
      })

      if (typeof callback === 'function' && errorFields.size)
        callback(false, Array.from(unref(errorFields)))
      else if (typeof callback === 'function' && !errorFields.size)
        callback(true, unref(props.model))
    }

    const handleSubmit = e => {
      e.preventDefault()
    }

    const getModel = () => {
      return props.model
    }

    emit('onValidateField', field => {
      console.log(field)
    })

    provide('formContext', {
      ...root.vnode,
      ...props,
      addField,
      addErrorField,
      removeErrorField,
      getModel,
    })

    return {
      validate,
      handleSubmit,
    }
  },
  render() {
    const prefixClass = 'tx'

    return h(
      'form',
      {
        onSubmit: this.handleSubmit,
        class: `${prefixClass}-form`,
      },
      [this.$slots.default()]
    )
  },
})
