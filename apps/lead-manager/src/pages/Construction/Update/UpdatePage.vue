<template>
  <Card class="form">
    <ProjectForm :data="formData" :isCreate="false" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Card from '@/components/commons/Card'
import ProjectForm from '@/components/fragments/Construction/ActionForm.vue'

export default {
  components: {
    Card,
    ProjectForm
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const formData = reactive({})

    const handleSubmit = (data) => {
      store.dispatch('construction/updateData', {
        action: 'form.create',
        redirectUrl: '/',
        data
      })
    }

    const getSelectedData = (id) => {
      return store.getters['construction/getSelectedItem'](id)
    }

    onMounted(() => {
      const {
        params: { data },
        query: { projectId }
      } = route

      const filteredData = getSelectedData(projectId)
      console.log('D: ', unref(filteredData))
      if (filteredData) {
        Object.assign(formData, filteredData)
      } else router.push('/')
    })

    return {
      formData,
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
