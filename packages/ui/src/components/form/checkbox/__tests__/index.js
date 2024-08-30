import { mount } from '@vue/test-utils'
import Checkbox from '@common/Form/Checkbox'

describe('common/Form/Checkbox', () => {
  let planets = []
  let Component

  beforeAll(() => {
    const props = {
      items: ['Earth', 'Mars', 'Venus', 'Saturn'],
    }

    Component = mount(<Checkbox v-model={planets} {...props} />)
  })

  it('will render and match snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })
})
