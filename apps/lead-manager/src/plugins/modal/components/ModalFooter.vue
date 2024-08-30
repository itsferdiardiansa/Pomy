<template>
  <div class="button-action">
    <Button ref="modalCancelBtnEL" label="No" variant="dark" size="base" @click="handleCancel" />

    <Button
      ref="modalConfirmBtnEl"
      label="Yes"
      variant="primary"
      class="ml-2"
      size="base"
      @click="handleConfirm"
    />
  </div>
</template>
<script>
import { Button } from '@pomy/ui'

export default {
  name: 'PLModalFooterDefault',
  components: {
    Button
  },
  props: {
    handleConfirm: {
      type: Function,
      default: () => {}
    },
    handleCancel: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
