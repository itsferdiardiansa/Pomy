/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from '@/routes'
import store from '@/store'
import { FontAwesomeIcon } from '@/plugins/fontAwesome'
import Notification from '@/plugins/notification'
import ModalPlugin from '@/plugins/modal'
import VueLazyLoad from '@jambonn/vue-lazyload'
import errorImage from '@/assets/image-default.jpg'
// import '@/styles/main.scss';

const app = createApp(App)

// Alert plugin
app.use(Notification)

// Modal Plugin
app.use(ModalPlugin)

// Vuex store
app.use(store)

// Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon)

// Image lazy load
app.use(VueLazyLoad, {
  error: errorImage
})

// Vue router
createAppRouter(app)

// Mount app
app.mount('#app')
