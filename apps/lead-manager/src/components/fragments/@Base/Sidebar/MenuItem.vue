<template>
  <div class="flex flex-col">
    <template v-if="!isCollapsed">
      <p
        class="uppercase text-xs font-black text-white mb-4 mt-4 tracking-wider px-6"
        v-text="item.title"
        v-if="item.title"
      ></p>
    </template>

    <template v-for="(item, key) in item.lists" :key="key">
      <SubMenu
        :item="item"
        :orderId="orderId"
        :ref="
          (el) => {
            if (el) menuItem[key] = el
          }
        "
      />
    </template>
  </div>
</template>
<script>
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'

export default {
  components: {
    SubMenu
  },
  props: {
    item: {
      type: [Object, Array]
    },
    orderId: {
      type: Number
    }
  },
  setup(props) {
    const router = useRoute()
    const menuItem = ref([])
    const appContext = inject('appContext')

    const activeLink = computed(() => {
      return router.path
    })

    const filteredOrderId = computed(() => {
      return props.orderId
    })

    onMounted(() => {})

    return {
      isCollapsed: appContext.isCollapsed,
      activeLink,
      filteredOrderId,
      menuItem
    }
  }
}
</script>
