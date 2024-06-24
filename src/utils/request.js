import axios from 'axios'

const service = axios.create({
  baseURL: 'api',
  timeout: 10000,
  withCredentials: true
})

const headers = {
  "Content-Type": "application/json",
}

service.interceptors.request.use(
  (config) => {
    config.headers = {
      ...headers,
      ...config.headers
    }

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service