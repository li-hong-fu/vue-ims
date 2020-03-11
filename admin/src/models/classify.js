import request from './request'
import api from './api'
export default {
  get: function (data = {}) {
    return request.get(api.classify, data)
  },
  post: function (data = {}) {
    return request.post(api.classify, data)
  },
  put: function (id, data = {}) {
    return request.put(api.classifyItem(id), data)
  },
  delete: function (id) {
    return request.delete(api.classifyItem(id))
  },
  item: function (id) {
    return request.get(api.articleItem(id))
  }
}
