<template>
  <div>
    <router-view>
      <template v-slot="{ Component }">
        <component :is="Component"></component>
      </template>
    </router-view>
  </div>
</template>
