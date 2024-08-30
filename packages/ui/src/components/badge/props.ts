export type BadgeTypes = {
  label: string
  inverse: boolean
  variant: string
  size: string
  icon: unknown[]
  rounded: boolean
  pill: boolean
  dot: boolean
}

const badgeProps = {
  label: '',
  inverse: false,
  variant: 'light',
  size: 'xs',
  icon: () => [],
  rounded: true,
  pill: false,
  dot: false,
}

export default badgeProps
