import axios from 'axios'
import { getUUID } from './utils'
import { getCookie, setCookie } from './rookies'

const service = axios.create({
  baseURL: 'api',
  timeout: 10000,
  withCredentials: true,
})

const headers = {
  'Content-Type': 'application/json',
}

service.interceptors.request.use(
  (config) => {
    let uuid = null
    if (getCookie('uuid')) {
      uuid = getCookie('uuid')
    }
    else {
      uuid = getUUID(32, 16)
      setCookie('uuid', uuid)
    }

    config.headers = {
      ...headers,
      ...config.headers,
      'x-session-uuid': uuid,
    }

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

export default service
