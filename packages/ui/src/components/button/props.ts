export type ButtonTypes = {
  label: string
  inverse: boolean
  variant: string
  size: string
  icon: unknown[]
  bold: boolean
  disabled: boolean
  rounded: boolean
  pill: boolean
  isLoading: boolean
}

const buttonProps = {
  label: '',
  inverse: false,
  variant: 'light',
  size: 'base',
  icon: () => [],
  bold: false,
  disabled: false,
  rounded: true,
  pill: false,
  isLoading: false,
}

export default buttonProps
