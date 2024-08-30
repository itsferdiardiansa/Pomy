<template>
  <div class="list">
    <div class="mb-4">
      <RouterLink to="/create" class="font-bold">Add project</RouterLink>
    </div>

    <hr />
    <Table :headers="tHeaders" :items="filteredData">
      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, ref, unref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ActionButton } from '@/components/commons/Table'
import { Button, Table, Badge } from '@pomy/ui'

export default {
  components: {
    Table,
    Button,
    ActionButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const params = reactive({ page: 1, limit: 10 })

    const tHeaders = ref([
      {
        title: 'ID',
        accessor: 'id',
        width: '10%'
      },
      {
        title: 'Name',
        accessor: 'name',
        width: '10%',
        align: 'center'
      },
      {
        title: 'Location',
        accessor: 'location',
        width: '10%',
        align: 'center'
      },
      {
        title: 'Stage',
        accessor: 'stage',
        width: '15%',
        align: 'center'
      },
      { title: 'Category', accessor: 'category' },
      { title: 'Start Date', accessor: 'startDate', width: '11%', align: 'center' },
      { accessor: 'action', align: 'center' }
    ])

    const actionButtons = ref([
      {
        text: 'Edit',
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Construction Project',
            query: {
              projectId: data.id
            }
          })
        }
      },
      {
        text: 'Delete',
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          SSModal.show({
            title: 'Delete confirmation',
            content: 'Are you sure you want to delete this item?',
            onConfirmFn: () => deleteData(data)
          })
        }
      }
    ])

    const deleteData = (data) => {
      store.dispatch('construction/deleteData', {
        action: 'form.delete',
        redirectUrl: '/',
        data
      })
    }

    const filteredData = computed(() => {
      return store.getters['construction/getItems']
    })

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus)

      return request.error.status ? ErrorTable : EmptyTable
    })

    const handleAddProject = () => {
      router.push('/create')
    }

    const getPath = (path) => '/e/' + path

    return {
      filteredData,
      tHeaders,
      emptyDataComponent,
      handleAddProject,
      getPath,
      actionButtons,
      deleteData
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  @apply relative;

  .wrapper {
    @apply py-6 align-middle inline-block min-w-full shadow overflow-hidden bg-gray-50 px-8 pt-3 rounded-bl-lg rounded-br-lg;
  }
}
</style>
