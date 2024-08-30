import Badge from './Badge.vue'

const Template = args => ({
  components: { Badge },
  setup() {
    return { args }
  },
  template: '<Badge v-bind="args" />',
})

export const Basic = Template.bind({})
Basic.args = { variant: 'primary' }

export default {
  title: 'Core/Components/Badge',
  component: Badge,
  args: { label: 'paid' },
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
