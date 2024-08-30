<template>
  <div class="collapse-toggle">
    <div class="collapse-toggle--container" @click="handleCollapse">
      <div class="collapse-toggle--wrapper">
        <font-awesome-icon :icon="['fa', 'bars']" />
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const appContext = inject('appContext')

    const handleCollapse = () => {
      appContext.toggleCollapseSidebar()
    }

    return {
      handleCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.collapse-toggle {
  @apply w-auto absolute top-2.5 shadow-2xl hidden;
  right: -35px;
  background-color: $bg-blue;

  &--container {
    @apply w-full rounded-full overflow-hidden cursor-pointer;
  }

  &--wrapper {
    @apply py-2.5 px-3;

    svg {
      @apply w-4 text-white inline-block;
    }
  }
}
</style>
