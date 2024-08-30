/* eslint-disable */
import { ref } from 'vue'
const SIZE = {
  mobile: 768, // is default mobile screen (lend/port)
  tablet: 1200
}

/**
 * Detect screen device
 *
 * @param {String} device
 */

const screenDevice = () => {
  let isMobile = ref(false),
    isTablet = ref(false)

  const onResize = () => {
    const { innerWidth } = window

    isMobile.value = innerWidth < SIZE.mobile
    isTablet.value = innerWidth < SIZE.tablet && innerWidth > SIZE.mobile
  }

  window.addEventListener('resize', onResize)

  onResize()

  return {
    isMobile,
    isTablet
  }
}

export default screenDevice
