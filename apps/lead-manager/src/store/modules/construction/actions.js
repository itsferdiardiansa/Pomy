const actions = {
  addData({ commit }, payload) {
    commit('handleAddData', {
      requestData: payload,
      responseData: {
        result: { message: 'Successfully added!' }
      }
    })
  },
  updateData({ commit }, payload) {
    commit('handleUpdateData', {
      requestData: payload,
      responseData: {
        result: { message: 'Successfully updated!' }
      }
    })
  },
  deleteData({ commit }, payload) {
    commit('handleRemoveData', {
      requestData: payload,
      responseData: {
        result: { message: 'Successfully removed!' }
      }
    })
  }
}

export default actions
