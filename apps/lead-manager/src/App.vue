<template>
  <AppWrapper>
    <router-view />
  </AppWrapper>
</template>
<script>
/* eslint-disable */
import { getCurrentInstance } from 'vue'
import AppWrapper from '@/components/fragments/@Base/AppWrapper'
import LoadingComponent from '@/components/fragments/@Base/Loading'
import * as utils from '@/utils'

export default {
  name: 'AppRoot',
  components: {
    AppWrapper,
    LoadingComponent
  },
  created() {
    const root = getCurrentInstance()

    root.appContext.config.globalProperties.$util = utils
  }
}
</script>
