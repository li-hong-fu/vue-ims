import request from './request'
import api from './api'
export default {
  get: function (data = {}) {
    return request.get(api.article, data)
  },
  post: function (data = {}) {
    return request.post(api.article, data)
  },
  put: function (id, data = {}) {
    return request.put(api.articleEdit(id), data)
  },
  delete: function (id) {
    return request.delete(api.articleItem(id))
  },
  item: function (id, data = {}) {
    return request.get(api.articleItem(id), data)
  }
}
