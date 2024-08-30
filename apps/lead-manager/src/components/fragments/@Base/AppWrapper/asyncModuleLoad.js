/* eslint-disable */
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default () => {
  const store = useStore()
  const router = useRouter()
  const chunks = computed(() => store.getters['app/getChunks'])
  let modules

  router.beforeEach((to) => {
    modules = !!unref(chunks).modules.has(to.path)

    if (!modules) store.dispatch('app/progressChunkLoad')

    return true
  })

  router.afterEach((to) => {
    if (unref(chunks).isFetching) store.dispatch('app/progressChunkSuccess', to.path)
  })

  router.onError(() => {
    store.dispatch('app/progressChunkFailed')
  })
}
