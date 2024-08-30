<template>
  <div :class="['app-container', { 'menu-collapse': isCollapsed }]">
    <LayoutHeader />
    <LayoutSideBar />
    <LayoutContent />
  </div>
</template>
<script>
import { inject } from 'vue'
import LayoutHeader from '@/components/fragments/@Base/Header'
import LayoutSideBar from '@/components/fragments/@Base/Sidebar'
import LayoutContent from '@/components/fragments/@Base/Content'

export default {
  components: {
    LayoutHeader,
    LayoutSideBar,
    LayoutContent
  },
  setup() {
    const appContext = inject('appContext')

    return {
      isCollapsed: appContext.isCollapsed
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  &.menu-collapse {
    .app-header {
      @apply pl-16;
    }
    .app-content {
      margin-left: $pageContentCollapsedPaddingLeft;
    }
  }
}
</style>
