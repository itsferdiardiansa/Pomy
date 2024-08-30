const actions = {
  progressChunkLoad: ({ commit }) => {
    commit('chunkLoad')
  },
  progressChunkSuccess: ({ commit }, payload) => {
    commit('chunkLoaded', payload)
  },
  progressChunkFailed: ({ commit }) => {
    commit('chunkFailedLoad')
  }
}

export default actions
