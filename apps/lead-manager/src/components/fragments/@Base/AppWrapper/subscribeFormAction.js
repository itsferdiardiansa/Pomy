export default (type, payload, router) => {
  if (['form.create', 'form.update', 'form.delete'].includes(payload?.requestData?.action)) {
    const variant = type.match(/fetchFailed/g) ? 'danger' : 'success'
    const content = payload?.responseData?.result?.message

    !type.match(/fetchFailed/g) && SSNotification({ variant, content })

    if (
      ['form.create', 'form.update'].includes(payload?.requestData?.action) &&
      variant !== 'danger' &&
      Reflect.has(payload?.requestData, 'redirectUrl')
    ) {
      router.push(payload?.requestData.redirectUrl)
    }
  }
}
