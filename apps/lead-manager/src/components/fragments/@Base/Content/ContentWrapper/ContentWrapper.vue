<template>
  <Card class="content">
    <div class="content--wrapper">
      <div class="content--header" v-if="$slots.header">
        <slot name="header" />
      </div>

      <div class="content--main">
        <slot />
      </div>
    </div>
  </Card>
</template>
<script>
import Card from '@/components/commons/Card'

export default {
  components: {
    Card
  }
}
</script>
<style lang="scss" scoped>
.content {
  @apply w-full;

  &--wrapper {
    @apply p-6;
  }

  &--header {
    @apply h-10 py-4 box-content;
  }

  &--main {
    @apply relative;
  }
}
</style>
