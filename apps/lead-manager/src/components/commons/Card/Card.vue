<template>
  <div :class="`${prefixClass}-card`">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.#{$prefixClass}-card {
  @apply bg-gray-50 rounded-lg flex flex-col;
}
</style>
