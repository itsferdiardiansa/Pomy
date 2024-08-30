<template>
  <div class="content-title">
    <p>{{ contentChapterTitle }}</p>
    <h3>{{ contentTitle }}</h3>
  </div>
</template>
<script>
import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: {},
  setup() {
    const route = useRoute()
    const store = useStore()

    const contentTitle = computed(() => {
      return route.name
    })

    const contentChapterTitle = computed(() => {
      return store.getters['app/getChapterMenu'](unref(contentTitle))
    })

    return {
      contentTitle,
      contentChapterTitle
    }
  }
}
</script>
<style lang="scss" scoped>
.content-title {
  @apply float-left text-left;

  p {
    @apply text-gray-400 font-extrabold;
  }

  h3 {
    @apply text-2xl font-black;
    color: $bg-blue;
  }
}
</style>
