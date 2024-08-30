<template>
  <nav class="navigation" aria-label="profile">
    <div class="navigation--wrapper">
      <div class="top">
        {{ user }}
      </div>

      <div class="bottom">
        <div class="status">
          <Badge variant="orange" :inverse="true" :pill="true">
            <label class="text-gray-800 px-4">Admin</label>
          </Badge>
        </div>

        <div class="logout" @click="tryLogout" role="button" aria-label="logout">
          <span>Logout</span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
/* eslint-disable */
import { computed, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { Dropdown, DropdownItem } from '@/components/commons/DropdownMenu'
import { Badge } from '@pomy/ui'

export default {
  components: {
    Dropdown,
    DropdownItem,
    Badge
  },
  setup() {
    const store = useStore()
    const profile = ref()
    const profileDropdown = ref()

    const toggleDropdown = () => {
      const profileDropdownEl = unref(profileDropdown)

      profileDropdownEl.toggleDropdown()
    }

    const user = computed(() => {
      return store.getters['user/getUser']
    })

    const tryLogout = async () => {
      SSModal.show({
        title: 'Confirmation',
        content: 'Are you sure to log out?',
        onConfirmFn: () => {
          store.dispatch('user/doLogout')
        }
      })
    }

    return {
      user,
      profile,
      profileDropdown,
      toggleDropdown,
      tryLogout
    }
  }
}
</script>
<style lang="scss" scoped>
.navigation {
  @apply relative inline-block float-right py-4;

  &--wrapper {
    @apply relative;

    .profile {
      @apply w-9 overflow-hidden rounded-full cursor-pointer inline-block;

      &--avatar {
        @apply relative w-8 h-8;

        .img-avatar {
          @apply rounded-full border border-gray-100 shadow-sm;
        }
      }

      &--username {
        @apply ml-4 text-base font-normal;
      }
    }

    .dropdown {
      @apply absolute z-10 right-0 hidden bg-gray-50 group-hover:block;

      &--collapsed {
        @apply p-2 bg-white bg-gray-50 shadow-lg;

        .list {
          @apply grid grid-cols-1 gap-4 md:grid-cols-2 text-base;
        }
      }
    }

    .top {
      @apply px-4 text-left font-extrabold;
    }

    .bottom {
      @apply flex items-center;

      .status {
        @apply py-2 px-4 flex items-center;
      }

      .logout {
        @apply py-2 px-4 font-semibold text-orange cursor-pointer;
      }
    }
  }
}
</style>
