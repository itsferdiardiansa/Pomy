<template>
  <Card class="form">
    <ConstructionForm @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Card from '@/components/commons/Card'
import ConstructionForm from '@/components/fragments/Construction/ActionForm.vue'

export default {
  components: {
    Card,
    ConstructionForm
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const handleSubmit = (data) => {
      store.dispatch('construction/addData', {
        action: 'form.create',
        redirectUrl: '/',
        data
      })
    }

    return {
      handleSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  @apply w-full p-6;
}
</style>
