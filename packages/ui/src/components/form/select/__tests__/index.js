import { mount } from '@vue/test-utils'
import Select from '@common/Form/Select'

describe('common/Form/Select', () => {
  let artist = ''
  let Component

  beforeAll(() => {
    const props = {
      items: [
        { value: 'Muse', label: 'Muse' },
        { value: 'Alterbridge', label: 'Alterbridge' },
        { value: 'Lamb of God', label: 'Lamb of God' },
        { value: 'Erra', label: 'Erra' },
        { value: 'Architects', label: 'Architects' },
      ],
    }

    Component = mount(<Select v-model={artist} {...props} />)
  })

  it('will render and match snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })

  it('will click and select item then running toggle dropdown', async () => {
    await Component.find(
      `.${Component.rootVM.prefixClass}-select--button`
    ).trigger('click')
    const dropdownItems = Component.findAll('.dropdown-item')

    await dropdownItems[1].trigger('click')

    expect(artist).toEqual('Alterbridge')
    expect(Component.element).toMatchSnapshot()
  })
})
