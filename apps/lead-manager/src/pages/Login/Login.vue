<template>
  <div class="login-page">
    <div class="header-logo">
      <img
        src="https://www.bcicentral.com/wp-content/uploads/2022/05/BCI-Central-Logo.png"
        width="100"
      />
    </div>

    <div class="content">
      <div class="bg-img">
        <img svg-inline src="@/assets/icons/login.svg" />
      </div>

      <Card class="card">
        <div class="card-title">
          <h3>Login as an Admin User</h3>
        </div>

        <Form ref="formEl" :model="state" @submit="onSubmit">
          <FormControl :rules="{ email: rules.email }">
            <Input
              placeholder="Email"
              autocomplete="off"
              v-model="state.email"
              class="login-form-input"
              :icon="['fa', 'envelope']"
            />
          </FormControl>

          <FormControl :rules="{ password: rules.password }">
            <Input
              type="password"
              placeholder="Password"
              v-model="state.password"
              class="login-form-input"
              :icon="['fa', 'key']"
            />
          </FormControl>

          <FormControl>
            <Button
              label="Login"
              type="submit"
              variant="dark"
              class="btn-login"
              :bold="true"
              :pill="true"
            />
          </FormControl>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable */
import { computed, reactive, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Card from '@/components/commons/Card'
import { Button, FormControl, Form, Input } from '@pomy/ui'
import { emailPattern } from '@/utils/pattern'

const formEl = ref()
const store = useStore()
const router = useRouter()
const state = reactive({
  email: 'jum@gab.com',
  password: 'teaser@2024'
})
const rules = reactive({
  email: [
    { required: true, message: 'Please input email' },
    {
      type: 'string',
      pattern: emailPattern,
      message: 'Please check the email format'
    }
  ],
  password: [{ required: true, message: 'Please input password' }]
})

const onSubmit = () => {
  const form = unref(formEl)

  form.validate(async (valid, fields) => {
    console.log('submit: ', fields, valid, store)
    if (valid)
      try {
        const checkLogin = await store.dispatch('user/doLogin', unref(fields))

        if (checkLogin) router.push('/')
      } catch (error) {}
  })
}
</script>
<style lang="scss">
.login-page {
  @apply max-w-screen-xl mx-auto;

  .header-logo {
    @apply block mx-auto mt-5;

    svg {
      @apply w-6/12 md:w-80 mx-auto;
    }
  }

  .content {
    @apply w-full relative flex items-baseline md:items-center px-10 md:px-0;
    height: calc(100vh - 327px);

    @include screen-md {
      @apply h-full;
    }

    .bg-img {
      @apply hidden absolute left-0 md:relative md:block;
      z-index: -1;

      &::after {
        content: '';
        height: 70%;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border-right-width: 1px;
        border-right-color: #dadade;
      }

      svg {
        @apply w-full md:w-8/12 inline-block;
      }
    }

    .card {
      @apply w-full p-6 mx-4 shadow-lg md:mx-14 text-left z-50;

      @include screen-lg {
        width: 400px;
        margin-top: 0;
      }

      &-title {
        @apply relative;

        &::before {
          @apply border-purple-800;
          width: 17%;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          border-top-width: 2px;
          border-radius: 4px;
        }

        h3 {
          @apply text-xl font-bold py-3;
        }
      }

      .#{$prefixClass}-form-control {
        @apply px-2;

        &.has-feedback {
          @apply mb-0;
        }

        &:first-child:not(.has-feedback) {
          @apply mb-6;
        }

        &--wrapper {
          .#{$prefixClass}-control--input {
            input {
              @apply border-0 border-b;
            }
          }

          .#{$prefixClass}-control--info {
            @apply mb-0 mt-1;
          }
        }
      }

      .login-form-input {
        @apply bg-transparent;

        input {
          @apply py-2;
        }

        .icon {
          @apply top-3.5;
        }
      }

      .btn-login {
        @apply w-full h-12 bg-purple-700 hover:bg-purple-600;
      }
    }
  }
}
</style>
