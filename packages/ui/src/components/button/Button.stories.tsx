import ZButton from './Button.vue'

const Template = args => ({
  components: { ZButton },
  setup() {
    return { args }
  },
  template: '<ZButton v-bind="args" />',
})

export const Basic = Template.bind({})
Basic.args = { variant: 'primary', label: 'Click me' }

export default {
  title: 'Core/Components/Button',
  component: ZButton,
  args: { label: 'Button' },
  argTypes: {
    label: {
      control: 'text',
    },
    inverse: {
      control: 'boolean',
      default: false,
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'danger',
        'warning',
        'dark',
        'success',
        'light',
        'orange',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      default: 'base',
    },
    bold: {
      control: 'boolean',
      default: false,
    },
    disabled: {
      control: 'boolean',
      default: false,
    },
    rounded: {
      control: 'boolean',
      default: true,
    },
    pill: {
      control: 'boolean',
      default: false,
    },
  },
}
