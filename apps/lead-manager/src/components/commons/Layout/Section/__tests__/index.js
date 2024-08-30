import { mount } from '@vue/test-utils'
import Section from '@/components/commons/Layout/Section'

describe('common/Layout/Section', () => {
  it('will render and match snapshot', () => {
    const Component = mount(<Section title="Title" />)

    expect(Component.element).toMatchSnapshot()
  })
})
