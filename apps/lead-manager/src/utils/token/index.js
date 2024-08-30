/* eslint-disable */
const Storage = function () {
  this.cacheLabel = process.env.NODE_ENV === 'development' ? 'ss_token_dev' : 'ss_token'
  this.createdAt = null
  this.expiresIn = 3600 * 5 // in 5 hours
  this.expiresAt = null
  this.cache = {}
  this.baseOptions = {}
  this.storage = {
    local: window.localStorage,
    session: window.sessionStorage
  }
}

Storage.prototype.setExpireTime = function () {
  this.createdAt = new Date().getTime()
  this.expiresAt = this.createdAt + this.expiresIn * 1000
}

Storage.prototype.setToken = function (data) {
  this.setExpireTime()
  const { expiresAt, expiresIn, createdAt, storage, cacheLabel } = this
  const { local, session } = storage

  local.setItem(cacheLabel, JSON.stringify({ createdAt, expiresAt, expiresIn, ...data }))
}

Storage.prototype.getToken = function () {
  const { storage, cacheLabel } = this
  const { local } = storage
  const data = JSON.parse(local.getItem(cacheLabel))

  if (!data?.token) return null

  if (data?.expiresAt < new Date().getTime()) return null

  return data?.token
}

Storage.prototype.getUser = function () {
  const { storage, cacheLabel } = this
  const { local } = storage
  const data = JSON.parse(local.getItem(cacheLabel))

  return data?.user
}

Storage.prototype.flush = function () {
  const {
    storage: { local, session },
    cacheLabel
  } = this

  local.removeItem(cacheLabel)
  session.removeItem(cacheLabel)
}

const storage = new Storage()

export default storage
