import { createApp } from 'vue'
import Notification from './components/Notification.vue'
import globalSetting from '@/plugins/globalSetting'
import { FontAwesomeIcon } from '@/plugins/fontAwesome'
import Emitter from 'mitt'
import './styles.scss'

const createElement = () => {
  const root = document.querySelector('body')
  const div = document.createElement('div')
  const elementClass = 'tx-notification-root'

  div.setAttribute('role', 'alert')
  div.setAttribute('class', elementClass)

  root.appendChild(div)

  return elementClass
}

export const NotificationPlugin = (app) => {
  const notificationRootElement = document.querySelector('[role="alert"]')
  let instance

  if (notificationRootElement) return false

  const notificationContext = {
    show: (...args) => {
      const {
        notificationContext: { emitter }
      } = instance._context.provides

      emitter.emit('show-notification', ...args)
    },
    init: async () => {
      try {
        const items = []

        instance = createApp(Notification)

        instance.mixin(globalSetting)
        instance.component('FontAwesomeIcon', FontAwesomeIcon)
        instance.provide('notificationContext', {
          emitter: new Emitter(),
          items
        })

        const elementClass = createElement(instance, app)

        if (elementClass) instance.mount(`.${elementClass}`)
      } catch (error) {
        console.error('We failed to create notification', error)
      }
    }
  }

  notificationContext.init()

  // Lite notification
  window.SSNotification = function () {
    const args = Array.prototype.slice.call(arguments)
    const [options] = args

    if (typeof options === 'object') notificationContext.show(options)
    else {
      const [variant, content, options] = args

      notificationContext.show({ variant, content, ...options })
    }
  }
}

export default {
  install: NotificationPlugin
}
