import { createLogger, createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'
import construction from './modules/construction'

const isProduction = process.env.NODE_ENV === 'production'

const modules = {
  app,
  user,
  construction
}

/**
 * Custom plugins
 *
 * @param {Object} store
 */

let _plugins = []

if (!isProduction) _plugins.push(createLogger())

export default createStore({
  modules,
  strict: isProduction,
  plugins: _plugins
})
