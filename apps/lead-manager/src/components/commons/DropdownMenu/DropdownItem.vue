<template>
  <div :class="`${prefixClass}-dropdown--item`">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.#{$prefixClass}-dropdown {
  &--item {
    @apply w-full min-w-min px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md transition duration-500 text-left;
  }
}
</style>
