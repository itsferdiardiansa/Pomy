<template>
  <template v-for="(item, key) in data" :key="item.link">
    <!-- {{ item  }} -->
    <MenuItem
      :item="item"
      :orderId="key"
      @setIndexMenuItem="handleIndexMenuItem"
      @setOrderMenuItem="handleOrderMenuItem"
    />
  </template>
</template>
<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'

export default {
  components: {
    MenuItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRoute()
    const indexMenuItem = ref(-1)
    const orderMenuItem = ref(0)

    const activeLink = computed(() => {
      return router.path
    })

    const filteredData = computed(() => {
      return props.data.map((item) => {
        return item.lists.map((list) => ({ icon: false, ...list }))
      })
    })

    const handleIndexMenuItem = (id) => {
      indexMenuItem.value = id
    }

    const handleOrderMenuItem = async () => {
      orderMenuItem.value = await orderMenuItem.value++
    }

    return {
      handleIndexMenuItem,
      handleOrderMenuItem,
      activeLink,
      filteredData,
      indexMenuItem,
      orderMenuItem
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  @apply capitalize font-medium text-sm text-white hover:text-gray-100;
  &:hover {
    background-color: $bg-orange;
  }

  &[disabled='true'] {
    @apply text-gray-300 cursor-not-allowed;
  }

  &.active {
    @apply text-gray-100 pointer-events-none;
  }

  a {
    @apply flex items-center px-6 py-2.5;
  }
}
</style>
