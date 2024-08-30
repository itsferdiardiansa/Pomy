<template>
  <transition name="slide" mode="out-in" appear>
    <div :class="`${prefixClass}-error`">
      <div :class="`${prefixClass}-error--title`">
        <div class="desc">
          <h3>404</h3>

          <p class="text-xl">Sorry, the page you were looking for was not found.</p>

          <p>Please check the link you want to go to or return to the home page.</p>
        </div>

        <div class="action">
          <Button label="Back to Home" variant="dark" :bold="true" @click="redirectToHome" />
        </div>
      </div>

      <div :class="`${prefixClass}-error--img`">
        <img svg-inline src="@/assets/icons/error-chunk-load.svg" />
      </div>
    </div>
  </transition>
</template>
<script>
import { useRouter } from 'vue-router'
import { Button } from '@pomy/ui'

export default {
  components: {
    Button
  },
  props: {
    isAuthRequired: Boolean
  },
  setup() {
    const router = useRouter()

    const redirectToHome = () => {
      router.push('/')
    }

    return {
      redirectToHome
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-error {
  @apply w-screen h-screen flex items-center justify-between -mt-20 px-20;

  &--title {
    @apply text-left;

    .desc {
      h3 {
        @apply text-9xl font-black text-gray-400;
      }

      p {
        :first-child {
          @apply text-2xl;
        }
      }
    }

    .action {
      @apply mt-4;
    }
  }

  &--img {
    @apply h-2/3;

    svg {
      @apply h-full pl-20;
    }
  }
}
</style>
