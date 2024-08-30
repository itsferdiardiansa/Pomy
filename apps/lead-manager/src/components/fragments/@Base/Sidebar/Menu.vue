<template>
  <div class="menu">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.menu {
  @apply flex flex-col w-full overflow-y-scroll;
  height: calc(100vh - 85px);
}
</style>
