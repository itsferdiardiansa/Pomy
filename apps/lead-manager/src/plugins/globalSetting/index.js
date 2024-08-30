import * as utils from '@/utils/textFormat'
import Schema from 'async-validator'

export default {
  data() {
    return {
      // prefixClass: SATPAM_PREFIX_CLASS,
      prefixClass: 'tx',
      theme: 'light',
      i18n: 'ID'
    }
  },
  methods: {
    Schema,
    ...utils,
    range: (size) => [...Array(size).keys()]
  }
}
