import axios, { type AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  // private accessToken: string
  constructor() {
    // this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      // baseURL: config.baseUrl,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Xử lí cho các request yêu cầu access_token
    this.instance.interceptors.request.use(
      (config) => {
        // Nếu có accessToken thì gáng vào headers để sau có thể móc ra sử dụng
        // còn rôi đã trả không thì cứ trả như bthg
        // if (this.accessToken && config.headers) {
        //   config.headers.Authorization = this.accessToken
        //   return config
        // }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
