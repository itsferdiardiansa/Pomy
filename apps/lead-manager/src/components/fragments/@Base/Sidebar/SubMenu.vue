<template>
  <div
    class="menu-item"
    :class="{ active: activeLink === item.link, inactive: !item.link }"
    @click="selectMenuItem"
  >
    <router-link :to="item.link" :disabled="!item.link">
      <font-awesome-icon :icon="item.icon" :class="getMenuItemIcon(isCollapsed)" v-if="item.icon" />
      <span v-text="item.name" v-if="!isCollapsed"></span>
    </router-link>

    <template v-if="isHasChildren">
      <div class="menu-item-collapsed">
        <template v-for="item in item.children || []" :key="item.link">
          <SubMenu :item="item" />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, getCurrentInstance, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    item: {
      type: Object
    }
  },
  setup(props) {
    const router = useRoute()
    const { parent } = getCurrentInstance()
    const appContext = inject('appContext')

    const activeLink = computed(() => {
      return router.path
    })

    const isHasChildren = computed(() => {
      return Reflect.has(props.item, 'children')
    })

    const getMenuItemIcon = (isCollapsed) => {
      return isCollapsed ? 'menu-item--icon-collapse' : 'menu-item--icon'
    }

    const selectMenuItem = () => {
      parent.emit('setIndexMenuItem', 12)
    }

    onMounted(() => {
      parent.emit('setOrderMenuItem')
    })

    return {
      isCollapsed: appContext.isCollapsed,
      activeLink,
      isHasChildren,
      selectMenuItem,
      getMenuItemIcon
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  @apply relative overflow-hidden capitalize font-medium text-sm text-white transition duration-500;

  &[disabled='true'] {
    @apply text-gray-300 cursor-not-allowed;
  }

  &.active {
    @apply text-white pointer-events-none;
    background-color: $bg-orange;
  }

  &.inactive {
    @apply text-gray-600 pointer-events-none;
  }

  a {
    @apply flex items-center px-6 py-2.5;

    &:hover {
      background-color: $bg-orange;
    }
  }

  &-tooltip {
    @apply w-full h-full absolute opacity-0 left-0;

    [data-tooltip-id] {
      @apply w-full h-full;
    }
  }

  &-open {
    a {
      @apply block;
    }
  }

  &-collapsed {
    a {
      @apply pl-10 hidden;
    }
  }

  &--icon {
    @apply w-3.5 mr-2;
  }
}
</style>
