<template>
  <div :class="`${prefixClass}-tb--action`">
    <div class="wrapper">
      <template v-for="(item, key) in data" :key="key">
        <div class="btn" @click="($event, $attrs) => item.onClickFn($event, dataBind)">
          <font-awesome-icon class="w-4" :icon="item.icon" />
          <span v-text="item.text"></span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { unref } from 'vue'

export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    item: {
      type: [Array, String, Number, Object, Boolean]
    }
  },
  setup(props) {
    return {
      dataBind: unref(props.item)
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-tb--action {
  @apply flex justify-center;

  .wrapper {
    @apply mr-2 grid grid-flow-col gap-2;

    .btn {
      @apply flex items-center hover:text-orange cursor-pointer mr-2;

      &:last-child {
        @apply mr-0;
      }

      span {
        @apply ml-2 font-medium;
      }
    }
  }
}
</style>
