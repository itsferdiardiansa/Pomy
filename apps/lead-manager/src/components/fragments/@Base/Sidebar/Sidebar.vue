<template>
  <aside :class="['app-sidebar', { collapsed: isCollapsed }]">
    <AppLogo />

    <LayoutMenu>
      <CollapseToggle />
      <ListMenu :data="menus" />
    </LayoutMenu>
  </aside>
</template>
<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
import AppLogo from './AppLogo.vue'
import CollapseToggle from './CollapseToggle.vue'
import LayoutMenu from './Menu.vue'
import ListMenu from './MenuList.vue'

export default {
  components: {
    AppLogo,
    LayoutMenu,
    ListMenu,
    CollapseToggle
  },
  setup() {
    const appContext = inject('appContext')
    const store = useStore()

    const menus = computed(() => {
      return store.getters['app/getMenu']
    })

    return {
      isCollapsed: appContext.isCollapsed,
      menus
    }
  }
}
</script>
<style lang="scss" scoped>
.app-sidebar {
  @apply w-64 z-50 max-h-full fixed top-0 left-0;
  @apply md:fixed md:top-0 md:shadow-xl text-left text-white;
  background-color: $bg-blue-10;

  &:hover {
    .collapse-toggle {
      @apply block;
    }
  }

  &.collapsed {
    @apply w-16;
  }
}
</style>
