/* eslint-disable no-unused-vars */
import { defineComponent, h, getCurrentInstance, unref, computed, ref, provide } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import globalSetting from '@/plugins/globalSetting'
import ErrorComponent from '@/components/fragments/@Base/Error'
import LoadingComponent from '@/components/fragments/@Base/Loading'
import subscribeFormAction from './subscribeFormAction'
import subscribeAuthAction from './subscribeAuthAction'
import asyncModuleLoad from './asyncModuleLoad'

const AppWrapper = defineComponent({
  beforeCreate() {
    const {
      appContext: { app }
    } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()

    store.subscribe(({ type, payload }, state) => {
      subscribeFormAction(type, payload, router)

      subscribeAuthAction(type, payload, router)
    })

    // Handle async module load
    asyncModuleLoad()

    // register global mixin
    app.mixin(globalSetting)

    window.addEventListener('beforeunload', () => {
      console.log('window unload')
    })
  },
  errorCaptured(error, component) {},
  setup(props, { slots }) {
    const store = useStore()
    let isCollapsed = ref(false)

    const toggleCollapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    provide('appContext', {
      isCollapsed: isCollapsed,
      toggleCollapseSidebar
    })

    const chunkModule = computed(() => store.getters['app/getChunks'])

    return () => {
      return unref(chunkModule)?.onError
        ? h(ErrorComponent, {})
        : unref(chunkModule)?.isFetching
          ? h(LoadingComponent)
          : slots.default()
    }
  }
})

export default AppWrapper
