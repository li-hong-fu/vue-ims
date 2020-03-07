import request from './request'
import api from './api'
export default {
  post: function (data = {}) {
    return request.post(api.login, data)
  }
}
