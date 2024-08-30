<template>
  <section class="app-header">
    <div class="app-header--container">
      <ContentTitle />

      <Navbar />
    </div>
  </section>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import ContentTitle from './ContentTitle.vue'

export default {
  components: {
    ContentTitle,
    Navbar
  },
  setup() {
    const route = useRoute()

    const contentTitle = computed(() => {
      return route.name
    })

    return {
      contentTitle
    }
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  @apply fixed bg-white w-full z-40 pl-64 box-border shadow;
  top: 0;
  // height: $pageHeaderHeight;

  &--container {
    @apply flex h-full px-6 items-center justify-between;
  }
}
</style>
