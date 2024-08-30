<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <Section title="Construction Project">
      <template #content>
        <FormControl
          label="Project Name"
          :rules="{
            name: [{ required: true, message: 'Project name is required' }]
          }"
        >
          <Input placeholder="Project Name" v-model="state.form.name" />
        </FormControl>

        <FormControl
          label="Location"
          :rules="{
            location: [{ required: true, message: 'Location name is required' }]
          }"
        >
          <Input placeholder="Location" v-model="state.form.location" />
        </FormControl>

        <FormControl
          label="Stage"
          :rules="{
            stage: [{ required: true, message: 'Stage is required' }]
          }"
        >
          <Select placeholder="Select stage" v-model="state.form.stage" :items="stageOptions" />
        </FormControl>

        <FormControl
          label="Category"
          :rules="{
            category: [{ required: true, message: 'Category is required' }]
          }"
        >
          <Select
            placeholder="Select category"
            v-model="state.form.category"
            :items="categoryOptions"
          />
        </FormControl>

        <!-- <template v-if="state.form.category === 'Others'">
          <FormControl
            label="Other category"
            :rules="{
              name: [{ required: true, message: 'Other category is required' }],
            }"
          >
            <Input
              placeholder="Type here"
              v-model="state.opt.otherCategory"
            />
          </FormControl>
        </template> -->

        <FormControl
          label="Start date"
          :rules="{
            startDate: [{ required: true, message: 'Start date is required' }]
          }"
        >
          <VueDatePicker v-model="state.form.startDate"></VueDatePicker>
        </FormControl>

        <FormControl
          label="Details/Description"
          :rules="{
            description: [{ required: true, message: 'Description is required' }]
          }"
        >
          <Textarea placeholder="Type here" v-model="state.form.description" />
        </FormControl>

        <FormControl :offset="3">
          <Button
            type="submit"
            variant="orange"
            :label="isCreate ? 'Create' : 'Update'"
            :icon="['fa', 'save']"
            :bold="true"
          />
        </FormControl>
      </template>
    </Section>
  </Form>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref } from 'vue'
import { Form, FormControl, Input, Textarea, Select, Button } from '@pomy/ui'
import VueDatePicker from '@vuepic/vue-datepicker'
import Section from '@/components/commons/Layout/Section'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: {
    Button,
    Form,
    FormControl,
    Input,
    Textarea,
    Select,
    Section,
    VueDatePicker
  },
  emits: ['submit'],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    withValidation: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const formEl = ref()
    const stageOptions = reactive([
      { value: 'Concept', label: 'Concept' },
      { value: 'Design & Documentation', label: 'Design & Documentation' },
      { value: 'Pre-Construction', label: 'Pre-Construction' },
      { value: 'Construction', label: 'Construction' }
    ])
    const categoryOptions = reactive([
      { value: 'Education', label: 'Education' },
      { value: 'Office', label: 'Office' },
      { value: 'Concept', label: 'Concept' },
      { value: 'Others', label: 'Others' }
    ])
    const state = reactive({
      form: {
        id: crypto.randomUUID(),
        name: '',
        location: '',
        stage: '',
        category: '',
        description: '',
        startDate: ''
      }
      // opt: {
      //   otherCategory: ''
      // }
    })

    const handleSubmit = () => {
      const { withValidation } = props
      const form = unref(formEl)

      form.validate((valid) => {
        if (valid || !withValidation) {
          emit('submit', state.form)
        }
      })
    }

    onMounted(() => {
      const { data, isCreate } = props

      if (data && !isCreate) state.form = data
    })

    return {
      formEl,
      state,
      stageOptions,
      categoryOptions,
      handleSubmit
    }
  }
}
</script>
<style lang="scss">
.#{$prefixClass}-section {
  margin-top: 0 !important;

  &--title {
    padding-top: 0 !important;
  }
}
</style>
