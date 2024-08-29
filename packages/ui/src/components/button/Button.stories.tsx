import ZButton from './Button.vue'

const Template = args => ({
  components: { ZButton },
  setup() {
    return { args }
  },
  template: '<ZButton v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = { variant: 'primary', label: 'Click me' }

export default {
  title: 'Core/Button',
  component: ZButton,
  args: { label: 'Button' },
  argTypes: {
    variant: {
      options: ['primary'],
      control: 'select',
    },
    shape: {
      options: ['default', 'round'],
      control: 'select',
    },
    size: {
      options: ['medium', 'large'],
      control: 'select',
    },
  },
}
