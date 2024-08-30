<template>
  <transition name="fade-slide" appear>
    <div :class="`${prefixClass}-error`">
      <div :class="`${prefixClass}-error--img`">
        <img svg-inline src="@/assets/icons/error-chunk-load.svg" />
      </div>

      <div :class="`${prefixClass}-error--description`">
        <div class="message">
          <h1>Sorry there is a problem with our system</h1>

          <p>Wait a minute, let me clean up. Please try again or come back later.</p>
        </div>

        <div class="action-button">
          <Button label="Reload" variant="dark" size="xl" :bold="true" @click="handleClick" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Button } from '@pomy/ui'

export default {
  components: {
    Button
  },
  setup() {
    return {
      handleClick: () => window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-error {
  @apply h-screen flex flex-col items-center justify-center;

  &--img {
    @apply overflow-hidden;

    svg {
      @apply w-80 h-60;
    }
  }

  &--description {
    @apply mt-10;

    .message {
      h1 {
        @apply text-4xl font-black;
      }

      p {
        @apply mt-2;
      }
    }

    .action-button {
      @apply mt-3;

      button {
        @apply px-20;
      }
    }
  }
}
</style>
