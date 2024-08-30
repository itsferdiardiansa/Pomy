<template>
  <div :class="`${prefixClass}-section`">
    <div :class="`${prefixClass}-section--title`" v-if="title">
      <h3>{{ title }}</h3>
    </div>

    <div :class="`${prefixClass}-section--content`">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '  '
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-section {
  @apply pb-8 flex flex-col my-2;

  &--title {
    @apply py-6;

    h3 {
      @apply font-black text-2xl;
    }
  }

  &--content {
    @apply relative;
  }
}
</style>
