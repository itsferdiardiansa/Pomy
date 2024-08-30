import { mount, config } from '@vue/test-utils'
import Card from '@/components/commons/Card'

describe('common/Card', () => {
  let Component
  let prefixClass

  beforeAll(async () => {
    config.renderStubDefaultSlot = true

    Component = mount(Card)

    prefixClass = `${Component.rootVM.prefixClass}-card`
  })

  afterAll(() => {
    config.renderStubDefaultSlot = false
  })

  it('will render match snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })

  it('will render children correctly', () => {
    const ContentPage = {
      components: { Card },
      template: `
        <Card>
          <div class="content"></div>
        </Card>
      `
    }

    Component = mount(ContentPage, {
      shallow: true
    })

    expect(Component.element).toMatchSnapshot()
  })
})
