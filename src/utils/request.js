import axios from 'axios'

const { VITE_NODE_ENV } = import.meta.env

const service = axios.create({
  baseURL: VITE_NODE_ENV === 'development' ? 'api' : import.meta.env.VITE_GLOB_API_URL,
  timeout: 10000,
  withCredentials: true
})

const headers = {
  "Content-Type": "application/json",
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJqb2huIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzE4OTMxNzgxLCJleHAiOjE3MTkwMTgxODF9.frBriY91dPn9jBVViDrrvcf2qVXLNXvpj5XzOefrKpU'

service.interceptors.request.use(
  (config) => {
    config.headers = {
      ...headers,
      ...config.headers
    }

    // const isToken = (config.headers || {} ).isToken === false
    // if (!isToken) {
    //   // tokenCallback 通指获取token的方法, 看项目是使用什么来储存token
    //   config.headers["Authorization"] = "Bearer " + token;
    // }

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    // const code = res.data.code || 200
    // const message = res.data.message || ''

    return res.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service