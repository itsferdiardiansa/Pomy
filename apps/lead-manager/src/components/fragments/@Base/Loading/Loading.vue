<template>
  <transition name="fade" appear>
    <div :class="`${prefixClass}-loading`">
      <div class="anim">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h1>Please wait</h1>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
$prefixClass: 'tx';
.#{$prefixClass}-loading {
  @apply fixed bg-gray-100 w-screen h-screen z-50 -inset-0 flex flex-col items-center justify-center;

  h1 {
    @apply text-2xl font-black mt-4;
  }
}

.anim {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.anim div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #333334;
  animation: anim 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.anim div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.anim div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.anim div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes anim {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
