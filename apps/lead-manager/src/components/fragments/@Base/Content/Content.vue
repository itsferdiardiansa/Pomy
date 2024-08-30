<template>
  <main class="app-content">
    <div class="app-content--header" v-if="false">
      <h3>{{ contentTitle }}</h3>
    </div>

    <div class="app-content--main">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="ChildComponent"></component>
      </transition>
    </div>
  </main>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/fragments/@Base/Header'
import SideBar from '@/components/fragments/@Base/Sidebar'

export default {
  components: {
    Header,
    SideBar
  },
  setup() {
    const route = useRoute()
    const { isCollapsed } = inject('appContext')
    let onPageError = reactive(route.name === 'Page Not Found')

    const contentTitle = computed(() => {
      return route.name
    })

    const ChildComponent = computed(() => {
      return route.meta.components.render.default
    })

    return {
      isCollapsed,
      contentTitle,
      onPageError,
      ChildComponent
    }
  }
}
</script>
<style lang="scss" scoped>
.app-content {
  @apply text-left;
  margin-left: $pageContentPaddingLeft;
  margin-top: $pageContentPaddingTop;

  &--header {
    @apply px-6 py-6 shadow-md bg-gray-50;

    h3 {
      @apply text-2xl font-bold;
    }
  }

  &--main {
    @apply h-full flex flex-row flex-wrap p-6;
  }
}
</style>
