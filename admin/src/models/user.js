import request from './request'
import api from './api'
export default {
  get: function (data = {}) {
    return request.get(api.user, data)
  },
  post: function (data = {}) {
    return request.post(api.user, data)
  },
  put: function (id) {
    return request.put(api.userItem(id))
  },
  delete: function (id) {
    return request.delete(api.userItem(id))
  }
}
